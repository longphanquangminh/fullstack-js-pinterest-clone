export default {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Capstone API",
    description: "API for Capstone project",
  },
  basePath: "/",
  paths: {
    "/register": {
      post: {
        summary: "Register a new user",
        consumes: ["application/json"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                hoTen: { type: "string" },
                tuoi: { type: "number" },
                matKhau: { type: "string" },
              },
              required: ["email", "hoTen", "tuoi", "matKhau"],
            },
          },
        ],
        responses: {},
      },
    },
    "/login": {
      post: {
        summary: "User login",
        consumes: ["application/json"],
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                matKhau: { type: "string" },
              },
              required: ["email", "matKhau"],
            },
          },
        ],
        responses: {},
      },
    },
    "/pictures": {
      get: {
        summary: "Get all pictures",
        responses: {},
      },
      post: {
        summary: "Upload a picture",
        consumes: ["multipart/form-data"],
        parameters: [
          { name: "token", in: "header", required: true, type: "string" },
          { name: "file", in: "formData", required: true, type: "file" },
          { name: "moTa", in: "formData", required: true, type: "string" },
          { name: "tenHinh", in: "formData", required: true, type: "string" },
        ],
        responses: {},
      },
    },
    "/pictures/search-by-name/{name}": {
      get: {
        summary: "Search pictures by name",
        parameters: [{ name: "name", in: "path", type: "string", required: true }],
        responses: {},
      },
    },
    "/pictures/{id}": {
      get: {
        summary: "Get picture by ID",
        parameters: [{ name: "id", in: "path", type: "integer", required: true }],
        responses: {},
      },
      delete: {
        summary: "Delete picture by ID",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer" },
          { name: "token", in: "header", required: true, type: "string" },
        ],
        responses: {},
      },
    },
    "/comments/{id}": {
      get: {
        summary: "Get comments for a picture",
        parameters: [{ name: "id", in: "path", type: "integer", required: true }],
        responses: {},
      },
      post: {
        summary: "Add a comment to a picture",
        consumes: ["application/json"],
        parameters: [
          { name: "id", in: "path", required: true, type: "integer" },
          { name: "token", in: "header", required: true, type: "string" },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                noiDung: { type: "string" },
              },
              required: ["noiDung"],
            },
          },
        ],
        responses: {},
      },
    },
    "/saved/{id}": {
      get: {
        summary: "Get saved pictures by user ID",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer" },
          { name: "token", in: "header", required: true, type: "string" },
        ],
        responses: {},
      },
      post: {
        summary: "Save a picture for a user",
        parameters: [
          { name: "id", in: "path", required: true, type: "integer" },
          { name: "token", in: "header", required: true, type: "string" },
        ],
        responses: {},
      },
    },
    "/users/{id}": {
      get: {
        summary: "Get user by ID",
        parameters: [{ name: "id", in: "path", required: true, type: "integer" }],
        responses: {},
      },
      put: {
        summary: "Update user information",
        consumes: ["application/json"],
        parameters: [
          { name: "id", in: "path", required: true, type: "integer" },
          { name: "token", in: "header", type: "string", required: true },
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                hoTen: { type: "string" },
                tuoi: { type: "number" },
                matKhau: { type: "string" },
              },
              required: ["email", "hoTen", "tuoi", "matKhau"],
            },
          },
        ],
        responses: {},
      },
    },
    "/saved-by-user/{id}": {
      get: {
        summary: "Get pictures saved by user ID",
        parameters: [{ name: "id", in: "path", required: true, type: "integer" }],
        responses: {},
      },
    },
    "/created-by-user/{id}": {
      get: {
        summary: "Get pictures created by user ID",
        parameters: [{ name: "id", in: "path", required: true, type: "integer" }],
        responses: {},
      },
    },
    "/users/avatar/{id}": {
      post: {
        summary: "Upload user avatar",
        consumes: ["multipart/form-data"],
        parameters: [
          { name: "id", in: "path", required: true, type: "integer" },
          { name: "token", in: "header", required: true, type: "string" },
          { name: "file", in: "formData", required: true, type: "file" },
        ],
        responses: {},
      },
    },
  },
};
