import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as z from "zod";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-datepicker";
import RNPickerSelect from "react-native-picker-select";

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

export default function BookServiceScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      visit_date: new Date().toISOString().split("T")[0],
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

      navigation.navigate("MyRequests");
    } catch (error: any) {
      console.error("Error:", error.response?.data);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to book service ❌",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book a Service</Text>

      {/* Product Dropdown */}
      <Text style={styles.label}>Select Product</Text>
      <Controller
        control={control}
        name="product"
        render={({ field }) => (
          <View style={styles.selectContainer}>
            <RNPickerSelect
              onValueChange={field.onChange}
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

      {/* Service Type Dropdown */}
      <Text style={styles.label}>Service Type</Text>
      <Controller
        control={control}
        name="service_type"
        render={({ field }) => (
          <View style={styles.selectContainer}>
            <RNPickerSelect
              onValueChange={field.onChange}
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

      {/* Address Input */}
      <Text style={styles.label}>Address</Text>
      <Controller
        control={control}
        name="address"
        render={({ field }) => (
          <TextInput style={styles.input} placeholder="Enter your address" onChangeText={field.onChange} />
        )}
      />
      {errors.address && <Text style={styles.error}>{errors.address.message}</Text>}

      {/* Description */}
      <Text style={styles.label}>Issue Description</Text>
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextInput style={[styles.input, styles.textArea]} multiline placeholder="Describe your issue..." onChangeText={field.onChange} />
        )}
      />
      {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}

      {/* Visit Date */}
      <Text style={styles.label}>Preferred Visit Date</Text>
      <Controller
        control={control}
        name="visit_date"
        render={({ field }) => (
          <DatePicker
            style={styles.datePicker}
            date={field.value}
            mode="date"
            placeholder="Select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => setValue("visit_date", date)}
          />
        )}
      />
      {errors.visit_date && <Text style={styles.error}>{errors.visit_date.message}</Text>}

      {/* Visit Time */}
      <Text style={styles.label}>Preferred Visit Time</Text>
      <Controller
        control={control}
        name="visit_time"
        render={({ field }) => (
          <TextInput style={styles.input} placeholder="HH:MM (24-hour format)" onChangeText={field.onChange} />
        )}
      />
      {errors.visit_time && <Text style={styles.error}>{errors.visit_time.message}</Text>}

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Submitting..." : "Submit Request"}</Text>
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "500", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, fontSize: 16, marginBottom: 10 },
  textArea: { height: 80 },
  datePicker: { width: "100%", marginBottom: 10 },
  button: { backgroundColor: "#0088CC", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  error: { color: "red", fontSize: 14, marginBottom: 10 },
  selectContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 10, padding: 8 },
});

// ✅ Picker Styles
const pickerStyles = {
  inputIOS: { fontSize: 16, paddingVertical: 10, paddingHorizontal: 12, color: "#333" },
  inputAndroid: { fontSize: 16, paddingVertical: 10, paddingHorizontal: 12, color: "#333" },
};
