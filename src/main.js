import { logger } from './application/logging.js';
import { web } from './application/web.js';

const port = 8080;

let crypto;
try {
    crypto = await import('node:crypto');
} catch (err) {
    console.error('crypto support is disabled!');
}

web.listen(port, () => {
    logger.info(`App starting on port ${port}`);
});
