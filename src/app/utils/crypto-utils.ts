export class CryptoUtils {
    static async generateCodeChallenge(code: string): Promise<string> {
        // Crea un buffer di dati dall'input
        const encoder = new TextEncoder();
        const data = encoder.encode(code);

        // Crea un hash SHA-256 del buffer di dati
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);

        // Codifica il hash in Base64 URL-safe
        return CryptoUtils.base64UrlEncode(hashBuffer);
    }

    // Funzione per codifica Base64 URL-safe
    static base64UrlEncode(arrayBuffer: ArrayBuffer): string {
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
}
