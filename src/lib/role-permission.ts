import { HttpError } from "@/lib/error";
import { IPayload } from "@/types";
import * as HttpStatusCodes from "stoker/http-status-codes";

/**
 * Validates if the user has the "organization" role.
 *
 * @param {IPayload} payload - The payload containing user role information.
 * @throws {HttpError} Throws an error if the role is not "organization".
 */
export function validateOrganizationRole({ role }: IPayload) {
    if (role !== "organization") {
        throw new HttpError(
            "You don't have permission to create an Event",
            HttpStatusCodes.UNAUTHORIZED
        );
    }
}
