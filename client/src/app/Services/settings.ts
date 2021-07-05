const env: string = 'production'; // production development

function getAddr(): string {
    if (env === 'production') {
        return 'https://ditrix-demo.herokuapp.com';
    }

    return 'http://localhost:3000';
}

export const apiKey: string = '7BDRK3QQ5BQQRY2IXP4EMIESQVGJGGB6DD';
export const serverAddr: string = getAddr();
