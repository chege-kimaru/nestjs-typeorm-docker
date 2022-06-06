# Base image
# Since we are using the multi-stage build feature, 
# we are also using the AS statement to name the image development. 
# The name here can be anything; it is only to reference the image later on.
FROM node:12-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
# We are telling Docker that it should run npm install and all the commands appearing afterwards only when either package.json or package-lock.json files change.
COPY package*.json ./

# Install app dependencies
# Here we install only devDependencies due to the container being used as a “builder” 
# that takes all the necessary tools to build the application and later send a clean /dist folder 
# to the production image.
# RUN npm install --only=development # This will cause issues while building
RUN npm install
# For migrations
RUN npm i -g typescript typeorm ts-node

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
# Finally, we make sure the app is built in the /dist folder. 
# Since our application uses TypeScript and other build-time dependencies, 
# we have to execute this command in the development image.
RUN npm run build

# Base image for production
FROM node:12-alpine As production

# Set NODE_ENV environment variable
# we are using the ARG statement to define the default value for NODE_ENV
# Then we use the ENV statement to set it to either the default value or the user-set value.
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
# If you have a package-lock.json, speedier builds with 'npm ci', otherwise use 'npm install --only=production'
# We are making sure that we install only dependencies defined in dependencies in package.json 
# by using the --only=production argument. 
# This way we don’t install packages such as TypeScript that would cause our final image to increase in size.
RUN npm ci --only=production

# Bundle app source
COPY . .

# Copy the bundled code
# Here we copy the built /dist folder from the development image. 
# This way we are only getting the /dist directory, without the devDependencies, installed in our final image.
COPY --from=development /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

# Thanks to the multi-stage build feature, we can keep our final image (here called production) 
# as slim as possible by keeping all the unnecessary bloat in the development image.

# To Build:
# docker build -t app-name .
#  To Run:
# docker run app-name
