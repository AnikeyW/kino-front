module.exports = {
  apps: [
    {
      name: "holotv-client",
      script: "npm",
      args: "run start",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
