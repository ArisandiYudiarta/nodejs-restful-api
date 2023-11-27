import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

const port = 3000;

web.listen(port, () => {
    logger.info(`App starting on port ${port}`);
});
