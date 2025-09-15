import { APP_COLORS } from "../../../../src/constants/colors";
import {
  ControlButtonCancel,
  ControlButtonSuccess,
  CustomModal,
  CustomSafeAreaView,
  FormField,
  ListContainer,
  TouchableSettings,
  useGlobalLoadingModal,
} from "../../../../src/modules/common";
import {
  clockIcon,
  deleteIcon,
  exitIcon,
  infoIcon,
  nextIcon,
  privacyIcon,
  profileIcon,
  starIcon,
  sunIcon,
  termsIcon,
} from "../../../../src/constants/icons";
import { Auth } from "../../../../src/modules/auth";
import { errorToast, successToast } from "../../../../src/lib/Toast";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useAppVersionNotification } from "../../../../src/modules/notification";
import { useAuth } from "../../../../src/modules/auth";
import { useCart } from "../../../../src/modules/cart";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import lang from "../../../../src/lang/es";
import Toast from "react-native-toast-message";

export default function index() {
  const { appVersionInfo } = useAppVersionNotification();
  const { showLoadingModal, hideLoadingModal } = useGlobalLoadingModal();
  const { onLogout, user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteForm, setDeleteForm] = useState({
    password: "",
  });
  const { clearCart } = useCart();
  const [markRequired, setMarkRequired] = useState(false);

  useEffect(() => {
    Toast.hide();
  });

  const handleLogout = async () => {
    setOpenModal(false);

    if (openDeleteModal) {
      setOpenDeleteModal(false);
    }

    await onLogout();
    clearCart();
  };

  const handleAboutUs = () => {
    router.push("(drawer)/(tabs)/Settings/aboutUs");
  };

  const handleTerms = () => {
    router.push("(drawer)/(tabs)/Settings/termsAndConditions");
  };

  const handleGoToPrivacyPolicy = () => {
    router.push("(drawer)/(tabs)/Settings/privacyPolicy");
  };

  const handleCloseLogoutModal = () => {
    setOpenModal(false);
  };

  const handleOpenLogoutModal = () => {
    setOpenModal(true);
  };

  const handleDeleteAccount = async () => {
    setMarkRequired(true);

    if (deleteForm.password.trim() === "") {
      errorToast({
        title: lang?.pleaseInputPassword,
        slow: true,
      });
      return;
    } else {
      setOpenDeleteModal(false);
      showLoadingModal();
      try {
        const username = user.username;
        await Auth.deleteAccount({
          username,
          password: deleteForm.password,
        });
        await handleLogout();
        successToast({
          title: lang?.deleteAccountSuccess,
          slow: true,
        });
      } catch (error) {
        console.log("🚀 ~ handleDeleteAccount ~ error:", error);
        errorToast({
          title: lang?.deleteAccountFailed,
          slow: true,
        });
      } finally {
        hideLoadingModal();
      }
    }
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOrdersHistory = () => {
    router.push("(drawer)/(tabs)/Settings/ordersHistory");
  };

  const markAsRequired = (value) => {
    if (value?.trim() === "" && markRequired) return true;
    return false;
  };

  return (
    <CustomSafeAreaView>
      <ScrollView className="px-4 py-3">
        <ListContainer>
          <View className="space-y-5">
            <View className="flex flex-row space-x-5">
              <View className="w-10 h-10 bg-copy-dark-lighter rounded-full p-2 overflow-hidden">
                <Image
                  source={profileIcon}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  tintColor={APP_COLORS.foreground}
                />
              </View>

              <View className="flex flex-col justify-center">
                <Text className="text-base">{user?.username}</Text>
                <Text className="text-base text-slate-500">{user?.email}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={handleOpenLogoutModal}>
              <View className="flex flex-row">
                <View className="w-2/12 md:w-1/12 flex flex-row items-center">
                  <View className="w-10 h-10 p-2">
                    <Image
                      source={exitIcon}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      tintColor={APP_COLORS.copyDarkLighter}
                    />
                  </View>
                </View>

                <View className="w-10/12 md:w-11/12 pl-2">
                  <View className="flex flex-row py-1 justify-between">
                    <View className="flex flex-col justify-center ">
                      <Text className="text-base">{lang?.closeSession}</Text>
                    </View>

                    <View className="w-11 h-11 p-2">
                      <Image
                        source={nextIcon}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        tintColor={APP_COLORS.copyDarkLighter}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <View className="space-y-4">
              <Text className="text-lg font-bold">{lang?.generalSettings}</Text>
              <View className="space-y-1">
                {/* <TouchableSettings title={lang?.theme} icon={sunIcon} /> */}
                {/* <TouchableSettings title={lang?.rateOurApp} icon={starIcon} /> */}
                <TouchableSettings
                  title={lang?.ordersHistory}
                  icon={clockIcon}
                  handlePress={handleOrdersHistory}
                />
                <TouchableSettings
                  title={lang?.termsAndConditions}
                  icon={termsIcon}
                  handlePress={handleTerms}
                />
                <TouchableSettings
                  title={lang?.privacyPolicy}
                  icon={privacyIcon}
                  handlePress={handleGoToPrivacyPolicy}
                />
                <TouchableSettings
                  title={lang?.aboutUs}
                  icon={infoIcon}
                  handlePress={handleAboutUs}
                />

                <TouchableSettings
                  title={lang?.deleteAccount}
                  icon={deleteIcon}
                  iconColor="#f55"
                  titleColor="#f55"
                  isEnd={true}
                  handlePress={handleOpenDeleteModal}
                />

                <View className="pt-5">
                  <Text className="text-copy-light text-base text-right">
                    {lang?.version} ({appVersionInfo?.installedVersion})
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ListContainer>
      </ScrollView>

      <CustomModal isOpen={openModal} handleClose={handleCloseLogoutModal}>
        <View className="bg-white w-11/12 p-4 rounded-md">
          <View className="py-2 mb-4 space-y-5">
            <Text className="text-lg font-bold">{lang?.areYouSureLogout}</Text>
          </View>

          <View className="md:flex md:flex-row-reverse">
            <View className="md:w-6/12 md:pl-2">
              <ControlButtonSuccess
                title={lang?.logout}
                handlePress={handleLogout}
              />
            </View>

            <View className="md:w-6/12 md:pr-2 pt-2 md:pt-0">
              <ControlButtonCancel
                title={lang?.cancel}
                handlePress={handleCloseLogoutModal}
              />
            </View>
          </View>
        </View>
      </CustomModal>

      <CustomModal
        isOpen={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        withInput={true}
      >
        <View className="bg-white w-11/12 p-4 rounded-md">
          <View className="py-2 mb-4 space-y-5">
            <Text className="text-lg font-bold">
              {lang?.areYouSureDeleteAccount}
            </Text>

            <View className="px-1">
              <Text className="text-base text-red-500 font-bold">
                {lang?.deleteAccountWarning}
              </Text>

              <Text className="text-base text-red-500">
                {lang?.deleteAccountWarningDescription}
              </Text>
            </View>
            <View>
              <FormField
                mark={markAsRequired(deleteForm.password)}
                title={lang?.enterPasswordForDelete}
                placeholder={lang?.enterYourPassword}
                value={deleteForm.password}
                titleColorFeedback={false}
                handleChangeText={(event) =>
                  setDeleteForm({ ...deleteForm, password: event })
                }
              />
            </View>
          </View>

          <View className="md:flex md:flex-row-reverse">
            <View className="md:w-6/12 md:pl-2">
              <ControlButtonSuccess
                title={lang?.deleteAccount}
                handlePress={handleDeleteAccount}
              />
            </View>

            <View className="md:w-6/12 md:pr-2 pt-2 md:pt-0">
              <ControlButtonCancel
                title={lang?.cancel}
                handlePress={handleCloseDeleteModal}
              />
            </View>
          </View>
        </View>
      </CustomModal>
    </CustomSafeAreaView>
  );
}
