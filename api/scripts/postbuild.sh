cp package.json knexfile.js Dockerfile build/
cp -R migrations build/migrations
cp -R app/v1/Templates build/app/v1/Templates
cd build
npm install --only=production
