module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
      'Measurements',
      [
        {
          type: 'ttfb',
          value: 100.3455665,
          SiteId: 1,
          timestamp: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: 'fcp',
          value: 200.3455665,
          SiteId: 1,
          timestamp: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: 'dom',
          value: 200.3455665,
          SiteId: 1,
          timestamp: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: 'window',
          value: 200.3455665,
          SiteId: 1,
          timestamp: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
          {
              type: 'ttfb',
              value: 100.3455665,
              SiteId: 1,
              timestamp: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              type: 'fcp',
              value: 200.3455665,
              SiteId: 1,
              timestamp: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              type: 'dom',
              value: 200.3455665,
              SiteId: 1,
              timestamp: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              type: 'window',
              value: 200.3455665,
              SiteId: 1,
              timestamp: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
          },
      ],
      {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Components', null, {}),
};
