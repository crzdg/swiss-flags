.PHONY: install clean build-react-package build-react-example build-react dev-react build bump-version install-react-example

# Installs dependencies for the monorepo and any nested example folders
install:
	pnpm install --frozen-lockfile
	cd packages/react/example && pnpm install --frozen-lockfile

# Cleans up all generated files across the monorepo
clean:
	rm -rf packages/react/src packages/react/dist
	rm -rf packages/react/example/dist

# -------------------------
# REACT COMMANDS
# -------------------------

# Builds just the React library
build-react-package:
	pnpm --filter @swiss-flags/react run build

# Installs dependencies for the React example (not a workspace package)
install-react-example:
	cd packages/react/example && npm install

# Builds just the static Vite HTML site for React
build-react-example:
	cd packages/react/example && pnpm run build -- --base=/swiss-flags/react/

# Publishes the React package to npm (automatically builds it first to ensure it's up to date)
publish-react:
	pnpm --filter @swiss-flags/react publish --access public --no-git-checks

# Builds the React library, then the example site
build-react: build-react-package build-react-example


# Starts the local dev server for the React example
dev-react: install-react-example
	cd packages/react/example && pnpm run dev



# -------------------------
# GLOBAL COMMANDS
# -------------------------
# Bumps the version across all packages in the monorepo
# Usage: make bump-version VERSION=0.0.2 OR make bump-version VERSION=patch
bump-version:
	@if [ "$(VERSION)" = "" ]; then \
		echo "❌ Error: Please specify a version. Example: make bump-version VERSION=1.0.1"; \
		exit 1; \
	fi
	@echo "🚀 Bumping all packages to $(VERSION)..."
	@npm pkg set version=$(VERSION)
	@pnpm -r exec npm pkg set version=$(VERSION)
	@echo "✅ All package.json files updated to $(VERSION)!"


# The main build command (we will add build-vue and build-angular here later!)
build: build-react
