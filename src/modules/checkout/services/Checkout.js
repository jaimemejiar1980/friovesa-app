import { API } from "../../../constants/wordpress";
import { apiPrivate } from "../../../axios";
import { convertToMoney } from "../../../lib/utils";
import { ORDER } from "../../../constants/errorMessages";

export default class Checkout {
  static async getShippingZones() {
    try {
      const response = await apiPrivate.get(API.CHECKOUT.SHIPPING_ZONES.URL);

      const shippingZones = this.formatShippingZones(response.data);
      return shippingZones;
    } catch (error) {
      console.log("🚀 ~ Checkout ~ getShippingZones ~ error:", error);
      throw new Error(ORDER.SHIPPING_ZONES?.unknown_error);
    }
  }

  static formatShippingZones(shippingZones) {
    return shippingZones.map((zone) => {
      const costPerOrder = convertToMoney(zone?.cost_per_order);

      return {
        id: zone?.id,
        instanceId: zone?.instance_id,
        title: zone?.title,
        order: zone?.order,
        description: zone?.description,
        costPerOrder: costPerOrder,
        methodId: zone?.method_id,
      };
    });
  }
}
