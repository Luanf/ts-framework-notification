"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Template = require("email-templates");
const nodemailer = require("nodemailer");
const path = require("path");
const ts_framework_common_1 = require("ts-framework-common");
const base_1 = require("../base");
const EmailMessage_1 = require("./EmailMessage");
class Email extends base_1.NotificationService {
    /**
     * Instantiates a new email service instance.
     *
     * @param options The email service options
     */
    constructor(options) {
        super(Object.assign({ name: 'EmailService' }, options));
        if (options.transporter) {
            // Transporter instance was given to the constructor
            this.transporter = options.transporter;
        }
        else if (options.connectionUrl) {
            // Instantiate a new Transporter based on SMTP connection URL.
            this.transporter = nodemailer.createTransport(options.connectionUrl);
        }
        else {
            // No transporter available, prepare message for warning or crash
            const message = `${this.options.name}: The SMTP connectionUrl is not available.`;
            if (!options.debug) {
                // No debug mode, crash the service
                throw new ts_framework_common_1.BaseError(message);
            }
            else {
                // In debug mode we send all messages to the console
                this.logger.warn(`${message} All messages will be sent to the console as warnings.`);
            }
        }
        this.options.template = Object.assign({ defaultTemplate: 'cerberus' }, this.options.template);
        // If transporter is available, prepare the template engine
        if (this.transporter && this.options.template.enabled) {
            // Instantiate the template engine renderer for sending cool emails
            this.templateEngine = new Template({
                message: { from: options.from },
                transport: this.transporter,
                views: {
                    root: this.options.template.root || path.join(__dirname, './templates'),
                    options: {
                        extension: this.options.template.engine || 'ejs'
                    }
                }
            });
        }
    }
    /**
     * Verifies if the SMTP connection is OK.
     */
    isReady() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.transporter) {
                return false;
            }
            try {
                // If it doesnt throw an error everything is ok.
                yield this.transporter.verify();
                return true;
            }
            catch (exception) {
                this.logger.debug(exception);
                return false;
            }
        });
    }
    /**
     * Sends an email message.
     *
     * @param message The message options
     */
    send(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = message = message instanceof EmailMessage_1.EmailMessage ? message : new EmailMessage_1.EmailMessage(message);
            const isReady = yield this.isReady();
            if (isReady && this.templateEngine) {
                // Send email using the current template engine
                return this.templateEngine.send({
                    message: data,
                    locals: Object.assign({ getValue: (value, defaultValue) => value || defaultValue }, data.locals),
                    template: data.template || this.options.template.defaultTemplate,
                });
            }
            else if (isReady) {
                // Send simple email using the transporter
                return this.transporter.sendMail(data);
            }
            else {
                const errorMessage = `${this.options.name} is not ready, the SMTP connectionUrl may be invalid or unavailable`;
                if (this.options.debug) {
                    // Logs the email body in the console as a warning
                    this.logger.warn(errorMessage, { body: JSON.stringify(data, null, 2) });
                }
                else {
                    // Crash the service, email could not be sent
                    throw new ts_framework_common_1.BaseError(errorMessage);
                }
            }
        });
    }
}
exports.Email = Email;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2VtYWlsL0VtYWlsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLHlDQUF5QztBQUN6Qyw2QkFBNkI7QUFDN0IsNkRBQWdFO0FBQ2hFLGtDQUEwRTtBQUMxRSxpREFBa0U7QUF1Q2xFLE1BQWEsS0FBTSxTQUFRLDBCQUFtQjtJQUs1Qzs7OztPQUlHO0lBQ0gsWUFBWSxPQUE0QjtRQUN0QyxLQUFLLGlCQUFHLElBQUksRUFBRSxjQUFjLElBQUssT0FBTyxFQUFHLENBQUM7UUFFNUMsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFO1lBQ3ZCLG9EQUFvRDtZQUNwRCxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7U0FDeEM7YUFBTSxJQUFJLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDaEMsOERBQThEO1lBQzlELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDdEU7YUFBTTtZQUNMLGlFQUFpRTtZQUNqRSxNQUFNLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSw0Q0FBNEMsQ0FBQztZQUVqRixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDbEIsbUNBQW1DO2dCQUNuQyxNQUFNLElBQUksK0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxvREFBb0Q7Z0JBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyx3REFBd0QsQ0FBQyxDQUFDO2FBQ3RGO1NBQ0Y7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsbUJBQUssZUFBZSxFQUFFLFVBQVUsSUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBRSxDQUFD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b3J0ICogYXMgbm9kZW1haWxlciBmcm9tICdub2RlbWFpbGVyJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBCYXNlRXJyb3IsIExvZ2dlckluc3RhbmNlIH0gZnJvbSAndHMtZnJhbWV3b3JrLWNvbW1vbic7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlLCBOb3RpZmljYXRpb25TZXJ2aWNlT3B0aW9ucyB9IGZyb20gJy4uL2Jhc2UnO1xuaW1wb3J0IHsgRW1haWxNZXNzYWdlLCBFbWFpbE1lc3NhZ2VTY2hlbWEgfSBmcm9tICcuL0VtYWlsTWVzc2FnZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1haWxTZXJ2aWNlT3B0aW9ucyBleHRlbmRzIE5vdGlmaWNhdGlvblNlcnZpY2VPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IHNlbmRlciBmb3IgdGhlIGVtYWlscyBzZW50IGJ5IHRoZSBzZXJ2aWNlLlxuICAgKi9cbiAgZnJvbT86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGxvZ2dlciBpbnN0YW5jZSBmb3IgdGhlIHNlcnZpY2UuXG4gICAqL1xuICBsb2dnZXI/OiBMb2dnZXJJbnN0YW5jZTtcblxuICAvKipcbiAgICogRS1tYWlscyB3aWxsIGJlIHNlbnQgdG8gY29uc29sZSB3aGVuZXZlciB0aGUgY29ubmVjdGlvblVybCBpcyBub3QgYXZhaWxhYmxlIGlmIGRlYnVnIGlzIFwidHJ1ZVwiLlxuICAgKi9cbiAgZGVidWc/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgU01UUCBjb25uZWN0aW9uIFVSTC5cbiAgICovXG4gIGNvbm5lY3Rpb25Vcmw/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBOb2RlbWFpbGVyIHRyYW5zcG9ydGVyIHRvIGJlIHVzZWQgYXMgdGhlIHNlbmRlciBlbmdpbmUuXG4gICAqL1xuICB0cmFuc3BvcnRlcj86IG5vZGVtYWlsZXIuVHJhbnNwb3J0ZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB0ZW1wbGF0ZSBlbmdpbmUgb3B0aW9ucywgaWYgZW5hYmxlZFxuICAgKi9cbiAgdGVtcGxhdGU/OiB7XG4gICAgcm9vdD86IHN0cmluZztcbiAgICBlbmdpbmU/OiBzdHJpbmc7XG4gICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICBkZWZhdWx0VGVtcGxhdGU/OiBzdHJpbmc7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEVtYWlsIGV4dGVuZHMgTm90aWZpY2F0aW9uU2VydmljZSB7XG4gIHB1YmxpYyByZWFkb25seSBvcHRpb25zOiBFbWFpbFNlcnZpY2VPcHRpb25zO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdHJhbnNwb3J0ZXI/OiBub2RlbWFpbGVyLlRyYW5zcG9ydGVyO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdGVtcGxhdGVFbmdpbmU/OiBUZW1wbGF0ZTtcblxuICAvKipcbiAgICogSW5zdGFudGlhdGVzIGEgbmV3IGVtYWlsIHNlcnZpY2UgaW5zdGFuY2UuXG4gICAqIFxuICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgZW1haWwgc2VydmljZSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBFbWFpbFNlcnZpY2VPcHRpb25zKSB7XG4gICAgc3VwZXIoeyBuYW1lOiAnRW1haWxTZXJ2aWNlJywgLi4ub3B0aW9ucyB9KTtcblxuICAgIGlmIChvcHRpb25zLnRyYW5zcG9ydGVyKSB7XG4gICAgICAvLyBUcmFuc3BvcnRlciBpbnN0YW5jZSB3YXMgZ2l2ZW4gdG8gdGhlIGNvbnN0cnVjdG9yXG4gICAgICB0aGlzLnRyYW5zcG9ydGVyID0gb3B0aW9ucy50cmFuc3BvcnRlcjtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuY29ubmVjdGlvblVybCkge1xuICAgICAgLy8gSW5zdGFudGlhdGUgYSBuZXcgVHJhbnNwb3J0ZXIgYmFzZWQgb24gU01UUCBjb25uZWN0aW9uIFVSTC5cbiAgICAgIHRoaXMudHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydChvcHRpb25zLmNvbm5lY3Rpb25VcmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBObyB0cmFuc3BvcnRlciBhdmFpbGFibGUsIHByZXBhcmUgbWVzc2FnZSBmb3Igd2FybmluZyBvciBjcmFzaFxuICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMub3B0aW9ucy5uYW1lfTogVGhlIFNNVFAgY29ubmVjdGlvblVybCBpcyBub3QgYXZhaWxhYmxlLmA7XG5cbiAgICAgIGlmICghb3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAvLyBObyBkZWJ1ZyBtb2RlLCBjcmFzaCB0aGUgc2VydmljZVxuICAgICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSW4gZGVidWcgbW9kZSB3ZSBzZW5kIGFsbCBtZXNzYWdlcyB0byB0aGUgY29uc29sZVxuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGAke21lc3NhZ2V9IEFsbCBtZXNzYWdlcyB3aWxsIGJlIHNlbnQgdG8gdGhlIGNvbnNvbGUgYXMgd2FybmluZ3MuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zLnRlbXBsYXRlID0geyBkZWZhdWx0VGVtcGxhdGU6ICdjZXJiZXJ1cycsIC4uLnRoaXMub3B0aW9ucy50ZW1wbGF0ZSB9O1xuXG4gICAgLy8gSWYgdHJhbnNwb3J0ZXIgaXMgYXZhaWxhYmxlLCBwcmVwYXJlIHRoZSB0ZW1wbGF0ZSBlbmdpbmVcbiAgICBpZiAodGhpcy50cmFuc3BvcnRlciAmJiB0aGlzLm9wdGlvbnMudGVtcGxhdGUuZW5hYmxlZCkge1xuXG4gICAgICAvLyBJbnN0YW50aWF0ZSB0aGUgdGVtcGxhdGUgZW5naW5lIHJlbmRlcmVyIGZvciBzZW5kaW5nIGNvb2wgZW1haWxzXG4gICAgICB0aGlzLnRlbXBsYXRlRW5naW5lID0gbmV3IFRlbXBsYXRlKHtcbiAgICAgICAgbWVzc2FnZTogeyBmcm9tOiBvcHRpb25zLmZyb20gfSxcbiAgICAgICAgdHJhbnNwb3J0OiB0aGlzLnRyYW5zcG9ydGVyLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgIHJvb3Q6IHRoaXMub3B0aW9ucy50ZW1wbGF0ZS5yb290IHx8IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3RlbXBsYXRlcycpLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGV4dGVuc2lvbjogdGhpcy5vcHRpb25zLnRlbXBsYXRlLmVuZ2luZSB8fCAnZWpzJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIGlmIHRoZSBTTVRQIGNvbm5lY3Rpb24gaXMgT0suXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgaXNSZWFkeSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoIXRoaXMudHJhbnNwb3J0ZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIElmIGl0IGRvZXNudCB0aHJvdyBhbiBlcnJvciBldmVyeXRoaW5nIGlzIG9rLlxuICAgICAgYXdhaXQgdGhpcy50cmFuc3BvcnRlci52ZXJpZnkoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoZXhjZXB0aW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VuZHMgYW4gZW1haWwgbWVzc2FnZS5cbiAgICogXG4gICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIG9wdGlvbnNcbiAgICovXG4gIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2U6IEVtYWlsTWVzc2FnZVNjaGVtYSkge1xuICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlID0gbWVzc2FnZSBpbnN0YW5jZW9mIEVtYWlsTWVzc2FnZSA/IG1lc3NhZ2UgOiBuZXcgRW1haWxNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIGNvbnN0IGlzUmVhZHkgPSBhd2FpdCB0aGlzLmlzUmVhZHkoKTtcblxuICAgIGlmIChpc1JlYWR5ICYmIHRoaXMudGVtcGxhdGVFbmdpbmUpIHtcbiAgICAgIC8vIFNlbmQgZW1haWwgdXNpbmcgdGhlIGN1cnJlbnQgdGVtcGxhdGUgZW5naW5lXG4gICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZUVuZ2luZS5zZW5kKHtcbiAgICAgICAgbWVzc2FnZTogZGF0YSxcbiAgICAgICAgbG9jYWxzOiB7XG4gICAgICAgICAgZ2V0VmFsdWU6ICh2YWx1ZSwgZGVmYXVsdFZhbHVlKSA9PiB2YWx1ZSB8fCBkZWZhdWx0VmFsdWUsXG4gICAgICAgICAgLi4uZGF0YS5sb2NhbHNcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IGRhdGEudGVtcGxhdGUgfHwgdGhpcy5vcHRpb25zLnRlbXBsYXRlLmRlZmF1bHRUZW1wbGF0ZSxcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmIChpc1JlYWR5KSB7XG4gICAgICAvLyBTZW5kIHNpbXBsZSBlbWFpbCB1c2luZyB0aGUgdHJhbnNwb3J0ZXJcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zcG9ydGVyLnNlbmRNYWlsKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgJHt0aGlzLm9wdGlvbnMubmFtZX0gaXMgbm90IHJlYWR5LCB0aGUgU01UUCBjb25uZWN0aW9uVXJsIG1heSBiZSBpbnZhbGlkIG9yIHVuYXZhaWxhYmxlYDtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICAvLyBMb2dzIHRoZSBlbWFpbCBib2R5IGluIHRoZSBjb25zb2xlIGFzIGEgd2FybmluZ1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGVycm9yTWVzc2FnZSwgeyBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENyYXNoIHRoZSBzZXJ2aWNlLCBlbWFpbCBjb3VsZCBub3QgYmUgc2VudFxuICAgICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59Il19