'use strict';

const routes = require('./routes');
const PORT = 5000;

routes.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
