export const config = {
    corsOptions: {
        origin: checkOrigin([
            'http://localhost:3000',
        ]),
    }
};

function checkOrigin(whiteList: string[]) {
    return (origin: string, callback: any) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS for ${origin}`));
        }
    };
}
