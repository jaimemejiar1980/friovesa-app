import {
  BUSINESS_TYPES,
  DOCUMENT_TYPES,
} from "../../../../src/constants/wordpress";
import {
  CartCheckoutNavigationButtons,
  useCheckout,
  validateBilling,
  validateShipping,
} from "../../../../src/modules/checkout";
import { errorToast } from "../../../../src/lib/Toast";
import {
  CheckBox,
  FormField,
  ModalPicker,
  TextFormField,
} from "../../../../src/modules/common";
import { Picker } from "@react-native-picker/picker";
import { Platform, Text, View } from "react-native";
import { useAuth } from "../../../../src/modules/auth";
import { useEffect, useState } from "react";
import lang from "../../../../src/lang/es";

export default function Address({ handleBack, handleNext }) {
  const isIos = Platform.OS === "ios";
  const { user } = useAuth();
  const {
    billing,
    onChangeBilling,
    shipping,
    onChangeShipping,
    onSaveAddress,
  } = useCheckout();
  const [markRequired, setMarkRequired] = useState(false);

  const businessTypes = BUSINESS_TYPES;
  const documentTypes = DOCUMENT_TYPES;

  useEffect(() => {
    if (billing?.email === "") {
      onChangeBilling(user?.email, "email");
    }
  }, [user?.email]);

  const handleContinue = async () => {
    setMarkRequired(true);
    try {
      validateBilling({
        businessType: billing.businessType,
        documentType: billing.documentType,
        identification: billing.identification,
        name: billing.name,
        lastName: billing.lastName,
        address: billing.address,
        addressStreet: billing.addressStreet,
        sector: billing.sector,
        phone: billing.phone,
        email: billing.email,
        addressLatitude: billing.addressLatitude,
        addressLongitude: billing.addressLongitude,
        additionalNotes: billing.additionalNotes,
      });

      if (billing?.isShippingDifferent) {
        validateShipping({
          businessName: shipping.businessName,
          address: shipping.address,
          identification: shipping.identification,
          phone: shipping.phone,
          email: shipping.email,
        });
      }
    } catch (error) {
      errorToast({
        title: error?.message,
        slow: true,
      });
      return;
    }

    await onSaveAddress();
    handleNext();
  };

  const markAsRequired = (value) => {
    if (value?.trim() === "" && markRequired) return true;
    return false;
  };

  const markShippingAsRequired = (value) => {
    if (!billing?.isShippingDifferent) return;

    return markAsRequired(value);
  };

  const handleCheckDifferentShipping = () => {
    onChangeBilling(!billing?.isShippingDifferent, "isShippingDifferent");
  };

  return (
    <>
      <View className="space-y-7">
        <View className="px-4 space-y-5">
          <View className="space-y-1">
            <Text className="text-base text-gray-600">
              {lang?.businessType}
            </Text>

            <View
              className={`border border-border rounded-md ${
                markAsRequired(billing.businessType)
                  ? "border-error-content"
                  : "border-border"
              }`}
            >
              {isIos ? (
                <ModalPicker
                  value={billing.businessType}
                  defaultValue={lang?.select}
                  items={businessTypes}
                  handlePickValue={(itemValue) =>
                    onChangeBilling(itemValue, "businessType")
                  }
                />
              ) : (
                <Picker
                  selectedValue={billing.businessType}
                  onValueChange={(itemValue) =>
                    onChangeBilling(itemValue, "businessType")
                  }
                  style={{
                    marginHorizontal: -5,
                    marginVertical: -10,
                  }}
                >
                  {billing.businessType ? null : (
                    <Picker.Item label={lang?.select} value="" />
                  )}

                  {businessTypes?.map((businessType, index) => (
                    <Picker.Item
                      label={businessType.title}
                      value={businessType.value}
                      key={index}
                    />
                  ))}
                </Picker>
              )}
            </View>
          </View>

          <View className="space-y-1">
            <Text className="text-base text-gray-600">
              {lang?.documentType}
            </Text>

            <View
              className={`border border-border rounded-md ${
                markAsRequired(billing.documentType)
                  ? "border-error-content"
                  : "border-border"
              }`}
            >
              {isIos ? (
                <ModalPicker
                  value={billing.documentType}
                  defaultValue={lang?.select}
                  items={documentTypes}
                  handlePickValue={(itemValue) =>
                    onChangeBilling(itemValue, "documentType")
                  }
                />
              ) : (
                <Picker
                  selectedValue={billing.documentType}
                  onValueChange={(itemValue) =>
                    onChangeBilling(itemValue, "documentType")
                  }
                  style={{
                    marginHorizontal: -5,
                    marginVertical: -10,
                  }}
                >
                  {billing.documentType ? null : (
                    <Picker.Item label={lang?.select} value="" />
                  )}

                  {documentTypes?.map((documentType, index) => (
                    <Picker.Item
                      label={documentType.title}
                      value={documentType.value}
                      key={index}
                    />
                  ))}
                </Picker>
              )}
            </View>
          </View>

          <View>
            <FormField
              mark={markAsRequired(billing.identification)}
              title={lang?.identification}
              placeholder=""
              value={billing.identification}
              handleChangeText={(event) =>
                onChangeBilling(event, "identification")
              }
            />
          </View>

          <View>
            <FormField
              mark={markAsRequired(billing.name)}
              title={lang?.name}
              placeholder=""
              value={billing.name}
              handleChangeText={(event) => onChangeBilling(event, "name")}
              autoCapitalize="words"
            />
          </View>

          <View>
            <FormField
              mark={markAsRequired(billing.lastName)}
              title={lang?.lastName}
              placeholder=""
              value={billing.lastName}
              handleChangeText={(event) => onChangeBilling(event, "lastName")}
              autoCapitalize="words"
            />
          </View>

          <View className="space-y-3">
            <View>
              <FormField
                mark={markAsRequired(billing.address)}
                title={lang?.fullAddress}
                placeholder={lang?.address}
                value={billing.address}
                handleChangeText={(event) => onChangeBilling(event, "address")}
              />
            </View>

            <View>
              <FormField
                title=""
                placeholder={lang?.addressPlaceholder}
                value={billing.addressStreet}
                handleChangeText={(event) =>
                  onChangeBilling(event, "addressStreet")
                }
              />
            </View>
          </View>

          <View>
            <FormField
              mark={markAsRequired(billing.sector)}
              title={lang?.sector}
              placeholder=""
              value={billing.sector}
              handleChangeText={(event) => onChangeBilling(event, "sector")}
            />
          </View>

          <View>
            <FormField
              mark={markAsRequired(billing.phone)}
              title={lang?.mobilePhone}
              placeholder=""
              value={billing.phone}
              handleChangeText={(event) => onChangeBilling(event, "phone")}
            />
          </View>

          <View>
            <FormField
              mark={markAsRequired(billing.email)}
              title={lang?.email}
              placeholder=""
              value={billing.email}
              handleChangeText={(event) => onChangeBilling(event, "email")}
              autoCapitalize="none"
            />
          </View>

          {/* <View>
          <FormField
            title={lang?.addressLatitude}
            placeholder=""
            value={billing.addressLatitude}
            handleChangeText={(event) =>
              onChangeBilling(event, "addressLatitude")
            }
          />
        </View>

        <View>
          <FormField
            title={lang?.addressLongitude}
            placeholder=""
            value={billing.addressLongitude}
            handleChangeText={(event) =>
              onChangeBilling(event, "addressLongitude")
            }
          />
        </View> */}

          <View>
            <TextFormField
              title={lang?.optionalAdditionalNotes}
              placeholder={lang?.additionalNotesPlaceholder}
              value={billing.additionalNotes}
              handleChangeText={(event) =>
                onChangeBilling(event, "additionalNotes")
              }
            />
          </View>

          <View>
            <CheckBox
              isChecked={billing?.isShippingDifferent}
              onCheck={handleCheckDifferentShipping}
              title={lang?.sendDifferentShipping}
            />
          </View>
        </View>

        {billing?.isShippingDifferent && (
          <View className="px-4 space-y-5">
            <View>
              <FormField
                mark={markShippingAsRequired(shipping?.businessName)}
                title={lang?.businessName}
                placeholder=""
                value={shipping?.businessName}
                handleChangeText={(event) =>
                  onChangeShipping(event, "businessName")
                }
              />
            </View>

            <View>
              <FormField
                mark={markShippingAsRequired(shipping?.address)}
                title={lang?.address}
                placeholder=""
                value={shipping?.address}
                handleChangeText={(event) => onChangeShipping(event, "address")}
              />
            </View>

            <View>
              <FormField
                mark={markShippingAsRequired(shipping?.identification)}
                title={lang?.rucOridentification}
                placeholder=""
                value={shipping?.identification}
                handleChangeText={(event) =>
                  onChangeShipping(event, "identification")
                }
              />
            </View>

            <View>
              <FormField
                mark={markShippingAsRequired(shipping?.phone)}
                title={lang?.phone}
                placeholder=""
                value={shipping?.phone}
                handleChangeText={(event) => onChangeShipping(event, "phone")}
              />
            </View>

            <View>
              <FormField
                mark={markShippingAsRequired(shipping?.email)}
                title={lang?.email}
                placeholder=""
                value={shipping?.email}
                handleChangeText={(event) => onChangeShipping(event, "email")}
                autoCapitalize="none"
              />
            </View>
          </View>
        )}

        <View>
          <CartCheckoutNavigationButtons
            handleBack={handleBack}
            handleNext={handleContinue}
          />
        </View>
      </View>
    </>
  );
}
