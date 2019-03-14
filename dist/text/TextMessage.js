"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./../types");
const base_1 = require("../base");
class TextMessage extends base_1.BaseMessage {
    constructor(data) {
        super(Object.assign({}, data, { type: types_1.TransportTypes.TEXT }));
        this.from = data.from;
        this.to = data.to;
        this.text = data.text;
    }
}
exports.default = TextMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dE1lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvdGV4dC9UZXh0TWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0QztBQUM1QyxrQ0FBeUQ7QUFRekQsTUFBcUIsV0FBWSxTQUFRLGtCQUFXO0lBT2xELFlBQVksSUFBdUI7UUFDakMsS0FBSyxtQkFBTSxJQUFJLElBQUUsSUFBSSxFQUFFLHNCQUFjLENBQUMsSUFBSSxJQUFHLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDeEIsQ0FBQztDQUNGO0FBYkQsOEJBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc3BvcnRUeXBlcyB9IGZyb20gJy4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgQmFzZU1lc3NhZ2UsIEJhc2VNZXNzYWdlU2NoZW1hIH0gZnJvbSBcIi4uL2Jhc2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUZXh0TWVzc2FnZVNjaGVtYSBleHRlbmRzIEJhc2VNZXNzYWdlU2NoZW1hIHtcbiAgZnJvbT86IHN0cmluZztcbiAgdG86IHN0cmluZyB8IHN0cmluZ1tdO1xuICB0ZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRNZXNzYWdlIGV4dGVuZHMgQmFzZU1lc3NhZ2UgaW1wbGVtZW50cyBUZXh0TWVzc2FnZVNjaGVtYSB7XG4gIF9pZD86IHN0cmluZztcbiAgX3R5cGU6IHN0cmluZztcbiAgZnJvbT86IHN0cmluZztcbiAgdG86IHN0cmluZyB8IHN0cmluZ1tdO1xuICB0ZXh0OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGF0YTogVGV4dE1lc3NhZ2VTY2hlbWEpIHtcbiAgICBzdXBlcih7IC4uLmRhdGEsIHR5cGU6IFRyYW5zcG9ydFR5cGVzLlRFWFQgfSk7XG4gICAgdGhpcy5mcm9tID0gZGF0YS5mcm9tO1xuICAgIHRoaXMudG8gPSBkYXRhLnRvO1xuICAgIHRoaXMudGV4dCA9IGRhdGEudGV4dDtcbiAgfVxufSJdfQ==