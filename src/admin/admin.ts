import AdminJS, { ActionRequest } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSSequelize from '@adminjs/sequelize';
import sequelize from '../config/sequelize.js';
import { User } from '../models/User.js';
import { Note } from '../models/Note.js';
import { Chat } from '../models/Chat.js';
import bcrypt from 'bcryptjs';

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: { isVisible: { list: false, edit: true, filter: false, show: false } },
        },
        actions: {
          new: {
            before: async (request: ActionRequest) => {
              if (request.payload?.password) {
                request.payload.password = await bcrypt.hash(request.payload.password, 10);
              }
              return request;
            },
          },
          edit: {
            before: async (request: ActionRequest) => {
              if (request.payload?.password) {
                request.payload.password = await bcrypt.hash(request.payload.password, 10);
              }
              return request;
            },
          },
        },
      },
    },
    { resource: Note },
    //{ resource: Chat },
  ],
  branding: {
    companyName: 'AI Helper Admin',
  },
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@admin.com',
  password: process.env.ADMIN_PASSWORD || 'admin',
};

const router = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
      return null;
    },
    cookieName: 'adminjs',
    cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'supersecret',
  }
);

export { adminJs, router }; 