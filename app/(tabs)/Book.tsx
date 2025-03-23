import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as z from "zod";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";

// ✅ Define Validation Schema
const serviceSchema = z.object({
  product: z.string().min(1, "Product is required"),
  service_type: z.string().min(1, "Service type is required"),
  address: z.string().min(5, "Address is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  visit_date: z.string().min(1, "Please select a date"),
  visit_time: z.string().min(1, "Please select a time"),
});

type FormData = z.infer<typeof serviceSchema>;

export default function BookServiceScreen() {
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      product: "",
      service_type: "",
      address: "",
      description: "",
      visit_date: new Date().toISOString().split("T")[0],
      visit_time: "09:00",
    },
  });

  // ✅ Handle Form Submission
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const formattedData = {
        ...data,
        visit_date_time: `${data.visit_date}T${data.visit_time}`,
      };

      console.log("Submitting data:", formattedData);

      await axios.post("http://127.0.0.1:8000/api/services", formattedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Service request submitted! ✅",
      });

      router.push("/(tabs)/Services"); // Navigate to Services tab
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to book service ❌",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Date and Time Picker Handlers
  const handleDateChange = (event, selectedDate, onChange) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === "ios");
    const formattedDate = currentDate.toISOString().split("T")[0];
    onChange(formattedDate);
    console.log("Date selected:", formattedDate);
  };

  const handleTimeChange = (event, selectedTime, onChange) => {
    const currentTime = selectedTime || new Date();
    setShowTimePicker(Platform.OS === "ios");
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    onChange(formattedTime);
    console.log("Time selected:", formattedTime);
  };

  return (
    <LinearGradient colors={["#87cefa", "#f0f8ff"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Animatable.Text animation="fadeInDown" style={styles.title}>
          Book a Service
        </Animatable.Text> */}

        {/* Product Dropdown */}
        <Animatable.View animation="fadeInUp" delay={100}>
          <Text style={styles.label}>Select Product</Text>
          <Controller
            control={control}
            name="product"
            render={({ field: { onChange, value } }) => (
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  onValueChange={onChange}
                  value={value}
                  items={[
                    { label: "AquaPure", value: "AquaPure" },
                    { label: "Kent RO", value: "Kent RO" },
                    { label: "Livpure", value: "Livpure" },
                    { label: "Eureka Forbes", value: "Eureka Forbes" },
                  ]}
                  placeholder={{ label: "Select Product", value: "" }}
                  style={pickerStyles}
                />
              </View>
            )}
          />
          {errors.product && <Text style={styles.error}>{errors.product.message}</Text>}
        </Animatable.View>

        {/* Service Type Dropdown */}
        <Animatable.View animation="fadeInUp" delay={200}>
          <Text style={styles.label}>Service Type</Text>
          <Controller
            control={control}
            name="service_type"
            render={({ field: { onChange, value } }) => (
              <View style={styles.selectContainer}>
                <RNPickerSelect
                  onValueChange={onChange}
                  value={value}
                  items={[
                    { label: "Installation", value: "Installation" },
                    { label: "Repair", value: "Repair" },
                    { label: "Maintenance", value: "Maintenance" },
                    { label: "Filter Change", value: "Filter Change" },
                  ]}
                  placeholder={{ label: "Select Service Type", value: "" }}
                  style={pickerStyles}
                />
              </View>
            )}
          />
          {errors.service_type && <Text style={styles.error}>{errors.service_type.message}</Text>}
        </Animatable.View>

        {/* Address Input */}
        <Animatable.View animation="fadeInUp" delay={300}>
          <Text style={styles.label}>Address</Text>
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your address"
                placeholderTextColor="#aaa"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.address && <Text style={styles.error}>{errors.address.message}</Text>}
        </Animatable.View>

        {/* Description */}
        <Animatable.View animation="fadeInUp" delay={400}>
          <Text style={styles.label}>Issue Description</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                placeholder="Describe your issue..."
                placeholderTextColor="#aaa"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}
        </Animatable.View>

        {/* Visit Date */}
        <Animatable.View animation="fadeInUp" delay={500}>
          <Text style={styles.label}>Preferred Visit Date</Text>
          <Controller
            control={control}
            name="visit_date"
            render={({ field: { onChange, value } }) =>
              Platform.OS === "web" ? (
                <TextInput
                  style={styles.input}
                  type="date"
                  value={value}
                  onChangeText={onChange}
                />
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.inputText}>{value || "Select date"}</Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={new Date(value || Date.now())}
                      mode="date"
                      display="default"
                      minimumDate={new Date()}
                      onChange={(event, date) => handleDateChange(event, date, onChange)}
                    />
                  )}
                </>
              )
            }
          />
          {errors.visit_date && <Text style={styles.error}>{errors.visit_date.message}</Text>}
        </Animatable.View>

        {/* Visit Time */}
        <Animatable.View animation="fadeInUp" delay={600}>
          <Text style={styles.label}>Preferred Visit Time</Text>
          <Controller
            control={control}
            name="visit_time"
            render={({ field: { onChange, value } }) =>
              Platform.OS === "web" ? (
                <TextInput
                  style={styles.input}
                  type="time"
                  value={value}
                  onChangeText={onChange}
                />
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text style={styles.inputText}>{value || "Select time"}</Text>
                  </TouchableOpacity>
                  {showTimePicker && (
                    <DateTimePicker
                      value={new Date(`1970-01-01T${value || "09:00"}:00`)}
                      mode="time"
                      display="default"
                      onChange={(event, time) => handleTimeChange(event, time, onChange)}
                    />
                  )}
                </>
              )
            }
          />
          {errors.visit_time && <Text style={styles.error}>{errors.visit_time.message}</Text>}
        </Animatable.View>

        {/* Submit Button */}
        <Animatable.View animation="fadeInUp" delay={700}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <LinearGradient
              colors={["#1e90ff", "#00bfff"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {loading ? "Submitting..." : "Submit Request"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>

        <Toast />
      </ScrollView>
    </LinearGradient>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flexGrow: 1, padding: 20, paddingTop: 40 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e90ff",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Roboto-Bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    fontFamily: "Roboto-Bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    fontFamily: "Roboto-Bold",
  },
  inputText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Roboto-Bold",
  },
  textArea: { height: 100, textAlignVertical: "top" },
  button: { borderRadius: 12, marginTop: 20 },
  buttonGradient: { paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
  },
  error: { color: "#ff4040", fontSize: 14, marginBottom: 12, fontFamily: "Roboto-Bold" },
  selectContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

// ✅ Picker Styles
const pickerStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    color: "#333",
    fontFamily: "Roboto-Bold",
    borderRadius: 12,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    color: "#333",
    fontFamily: "Roboto-Bold",
    borderRadius: 12,
  },
  inputWeb: {
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    color: "#333",
    fontFamily: "Roboto-Bold",
  },
};