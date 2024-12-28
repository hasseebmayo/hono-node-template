import env from '@/env';
import { IPayload } from '@/types';
import { decode, sign, verify, } from 'hono/jwt'

/**
 * Generates a JWT token for the given payload.
 *
 * @param {Object} payload - The payload to be included in the JWT token.
 * @param {string} secret - The secret key used to sign the JWT token.
 * @returns {Promise<string>} - A promise that resolves to the JWT token.
 */
type TimeUnit = "s" | "m" | "h" | "d";

const parseExpiry = (time: string): number => {
    const regex = /^(\d+)([smhd])$/;
    const match = time.match(regex);

    if (!match) {
        throw new Error("Invalid time format. Use a number followed by 's', 'm', 'h', or 'd'. For example: '1d', '24h', or '60m'.");
    }

    const value = Number.parseInt(match[1], 10);
    const unit = match[2] as TimeUnit;

    switch (unit) {
        case "s": return value; // Seconds
        case "m": return value * 60; // Minutes
        case "h": return value * 60 * 60; // Hours
        case "d": return value * 60 * 60 * 24; // Days
        default: throw new Error("Unsupported time unit."); // This shouldn't happen due to regex.
    }
};
export const generateToken = async (payload: IPayload,expiry:string = "7d"): Promise<string> => {
    const expInSeconds = parseExpiry(expiry);

    const tokenPayload = {
        user:payload,
        // Set the expiration time to one week from now
        exp:Math.floor(Date.now() / 1000) + expInSeconds,
    }
    const token = await sign(tokenPayload,env.DATABASE_URL)
    return token;
};

/**
 * Verifies the given JWT token and returns the decoded payload.
 *
 * @param {string} token - The JWT token to be verified.
 * @returns {Promise<IPayload>} - A promise that resolves to the decoded payload.
 */
export const verifyToken = async (token: string): Promise<{user:IPayload}> => {
    const payload:any = await verify(token,env.LOG_LEVEL)
    return payload;
};

/**
 * This will give the payload inside of the token if its expired.
 * @param token
 *
 */
export const decodeToken =  (token: string): IPayload => {
    const {payload} =  decode(token)
    return payload as unknown as IPayload
}
