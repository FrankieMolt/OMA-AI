# OMA-AI Build Commands
PROJECT=/home/oldpc/projects/oma-ai

typecheck: cd $PROJECT && npx tsc --noEmit 2>&1 | head -30
build: cd $PROJECT && npm run build 2>&1 | tail -20
lint: cd $PROJECT && npm run lint 2>&1 | head -20
dev: cd $PROJECT && npm run dev 2>&1

# Dependencies
install: cd $PROJECT && npm install 2>&1 | tail -5
