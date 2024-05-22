function mockFetch() {
    window.fetch = (url, options) => {
        return new Promise((resolve, reject) => {
            let mockResponse = "";
            switch (true) {
                case url == "/api/uuid":
                    mockResponse = crypto.randomUUID();
                    break;
                case url == "/api/random":
                    mockResponse = Math.random();
                    break;
                case url == "/api/randomSlice8":
                    mockResponse = Math.random().toString(36).slice(-8);
                    break;
                default:
                    mockResponse = {};
            }
            resolve({
                ok: true,
                json: () => Promise.all(mockResponse),
            })
            }
        )
    }
}
mockFetch();