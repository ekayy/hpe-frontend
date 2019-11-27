const Hapi = require('hapi');
const Boom = require('boom');
const Joi = require('joi');
const faker = require('faker');

const server = Hapi.server({
  port: 8080,
  host: '0.0.0.0',
  routes: {
    validate: {
      failAction: async (request, h, err) => {
        console.error('ValidationError:', err.message);
        throw Boom.badRequest('Invalid request payload input');
      }
    },
    cors: true
  }
});

const num_orgs = 10;
const num_users = 100;
const num_assets = 1000;

let assetCounter = num_assets;

const organizations = [];
const users = [];
const assets = [];

for (let i = 1; i <= num_orgs; i++) {
  organizations.push({
    id: i,
    name: faker.commerce.department(),
    address: faker.address.streetAddress('###')
  });
}

for (let i = 1; i <= num_users; i++) {
  users.push({
    id: i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    organizationId: faker.random.number(num_orgs)
  });
}

for (let i = 1; i <= num_assets; i++) {
  assets.push({
    id: i,
    name: faker.company.companyName(0),
    brand: faker.commerce.department(),
    model: faker.commerce.product(),
    serialNumber: faker.helpers.replaceSymbolWithNumber('###-####-#####'),
    type: faker.random.arrayElement(['storage', 'network', 'compute']),
    acquisition: faker.date.past(10).toISOString(),
    warrantyExpiration: faker.date
      .between('2015-01-01', '2025-12-31')
      .toISOString(),
    organizationId: faker.random.number(num_orgs),
    userId: faker.random.number(num_users),
    retired: faker.random.boolean(),
    cost: faker.finance.amount()
  });
}

const AssetSchema = {
  id: Joi.number().optional(),
  name: Joi.string(),
  brand: Joi.string(),
  model: Joi.string(),
  serialNumber: Joi.string(),
  type: Joi.string().allow(['storage', 'network', 'compute']),
  acquisition: Joi.date()
    .iso()
    .optional(),
  warrantyExpiration: Joi.date()
    .iso()
    .optional(),
  organizationId: Joi.number().optional(),
  userId: Joi.number(),
  retired: Joi.bool().default(false),
  cost: Joi.number().precision(2)
};

const UserSchema = {
  id: Joi.number().optional(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  organizationId: Joi.number()
};

const OrganizationSchema = {
  id: Joi.number().optional(),
  name: Joi.string(),
  address: Joi.string()
};

const init = async () => {
  server.route({
    method: 'GET',
    path: '/organizations',
    handler(req, h) {
      return organizations;
    },
    options: {
      description: 'List organizations',
      response: {
        schema: Joi.array().items(OrganizationSchema)
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/organizations/{id}',
    handler(req, h) {
      const organization = organizations.find(({ id }) => id === req.params.id);
      return organization
        ? organization
        : Boom.notFound(`Organization "${req.params.id}" not found.`);
    },
    options: {
      description: 'Get an organization',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number()
        }
      },
      response: {
        schema: OrganizationSchema
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/organizations/{id}/users',
    handler(req, h) {
      const organization = organizations.find(({ id }) => id === req.params.id);
      return !organization
        ? Boom.notFound(`Organization "${req.params.id}" not found.`)
        : users.filter(x => x.organizationId === req.params.id);
    },
    options: {
      description: "Get an organization's users",
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number()
        }
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/organizations/{id}/assets',
    handler(req, h) {
      const organization = organizations.find(({ id }) => id === req.params.id);
      return !organization
        ? Boom.notFound(`Organization "${req.params.id}" not found.`)
        : assets.filter(x => x.organizationId === req.params.id);
    },
    options: {
      description: "Get an organization's assets",
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number()
        }
      },
      response: {
        schema: Joi.array().items(AssetSchema)
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/users',
    handler(req, h) {
      return users;
    },
    options: {
      description: 'Get users',
      tags: ['api'],
      response: {
        schema: Joi.array().items(UserSchema)
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/assets',
    handler(req, h) {
      return assets;
    },
    options: {
      description: 'Get assets',
      tags: ['api'],
      response: {
        schema: Joi.array().items(AssetSchema)
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/assets',
    handler(req, h) {
      const asset = { ...req.payload, id: ++assetCounter };
      assets.push(asset);
      return asset;
    },
    options: {
      description: 'Create an asset',
      tags: ['api'],
      validate: {
        payload: AssetSchema,
        options: {
          stripUnknown: true
        }
      },
      response: {
        schema: AssetSchema
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/assets/{id}',
    handler(req, h) {
      const asset = assets.find(({ id }) => id === req.params.id);
      return !asset
        ? Boom.notFound(`Asset "${req.params.id}" not found.`)
        : Object.assign(asset, { ...req.payload, id: asset.id });
    },
    options: {
      description: 'Update an asset',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number()
        },
        payload: AssetSchema,
        options: {
          stripUnknown: true
        }
      },
      response: {
        schema: AssetSchema
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/assets/{id}',
    handler(req, h) {
      const index = assets.findIndex(({ id }) => id === req.params.id);
      if (index < 0) {
        return Boom.notFound(`Asset "${req.params.id}" not found.`);
      }

      assets.splice(index, 1);
      return null;
    },
    options: {
      description: 'Delete an asset',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.number()
        }
      }
    }
  });

  await server.register([
    require('inert'),
    require('vision'),
    {
      plugin: require('hapi-swagger'),
      options: {
        info: {
          title: 'Frontend Challenge API Documentation',
          version: '1.0.0'
        }
      }
    }
  ]);

  await server.register({
    plugin: require('good'),
    options: {
      ops: {
        interval: 60000
      },
      reporters: {
        console: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
          },
          {
            module: 'good-console'
          },
          'stdout'
        ]
      }
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
