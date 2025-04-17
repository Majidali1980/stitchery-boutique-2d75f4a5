
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "demo-client-id", // Replace with your TinaCMS client ID in production
  token: "demo-token", // Replace with your TinaCMS token in production
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "order",
        label: "Orders",
        path: "content/orders",
        fields: [
          {
            type: "string",
            name: "id",
            label: "Order ID",
            required: true,
          },
          {
            type: "string",
            name: "customerName",
            label: "Customer Name",
            required: true,
          },
          {
            type: "string",
            name: "customerEmail",
            label: "Customer Email",
            required: true,
          },
          {
            type: "datetime",
            name: "orderDate",
            label: "Order Date",
            required: true,
          },
          {
            type: "number",
            name: "total",
            label: "Order Total",
            required: true,
          },
          {
            type: "string",
            name: "status",
            label: "Order Status",
            options: ["pending", "processing", "shipped", "delivered", "cancelled"],
            required: true,
          },
          {
            type: "object",
            name: "items",
            label: "Order Items",
            list: true,
            fields: [
              {
                type: "string",
                name: "productId",
                label: "Product ID",
              },
              {
                type: "string",
                name: "productName",
                label: "Product Name",
              },
              {
                type: "number",
                name: "quantity",
                label: "Quantity",
              },
              {
                type: "number",
                name: "price",
                label: "Price",
              },
            ],
          },
        ],
      },
      {
        name: "customer",
        label: "Customers",
        path: "content/customers",
        fields: [
          {
            type: "string",
            name: "id",
            label: "Customer ID",
            required: true,
          },
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
          },
          {
            type: "string",
            name: "email",
            label: "Email",
            required: true,
          },
          {
            type: "string",
            name: "phone",
            label: "Phone",
          },
          {
            type: "object",
            name: "address",
            label: "Address",
            fields: [
              {
                type: "string",
                name: "street",
                label: "Street",
              },
              {
                type: "string",
                name: "city",
                label: "City",
              },
              {
                type: "string",
                name: "state",
                label: "State",
              },
              {
                type: "string",
                name: "zipCode",
                label: "Zip Code",
              },
              {
                type: "string",
                name: "country",
                label: "Country",
              },
            ],
          },
        ],
      },
    ],
  },
});
