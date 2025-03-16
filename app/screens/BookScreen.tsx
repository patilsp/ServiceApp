import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import * as z from "zod";
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from "react-native-picker-select";
import { toast } from 'react-native-toast-message';

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      
      const formattedData = {
        ...data,
        visit_date_time: `${data.visit_date}T${data.visit_time}`,
      };

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Service request submitted successfully!');
      navigation.navigate("Appointments");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error('Failed to book service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setValue('visit_date', selectedDate.toISOString().split('T')[0]);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setSelectedTime(selectedTime);
      setValue('visit_time', selectedTime.toTimeString().slice(0, 5));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Book a Service</Text>
          <Text style={styles.subtitle}>Schedule your water purifier service</Text>
        </View>

        {/* Product Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Product</Text>
          <Controller
            control={control}
            name="product"
            className="form-control"
            render={({ field }) => (
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={field.onChange}
                  items={[
                    { label: "AquaPure", value: "AquaPure" },
                    { label: "Kent RO", value: "Kent RO" },
                    { label: "Livpure", value: "Livpure" },
                    { label: "Eureka Forbes", value: "Eureka Forbes" },
                  ]}
                  placeholder={{ label: "Select your product", value: "" }}
                  style={pickerSelectStyles}
                />
                <Ionicons name="chevron-down" size={20} color="#666" style={styles.pickerIcon} />
              </View>
            )}
          />
          {errors.product && <Text style={styles.error}>{errors.product.message}</Text>}
        </View>

        {/* Service Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service Type</Text>
          <Controller
            control={control}
            name="service_type"
            render={({ field }) => (
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={field.onChange}
                  items={[
                    { label: "Installation", value: "Installation" },
                    { label: "Repair", value: "Repair" },
                    { label: "Maintenance", value: "Maintenance" },
                    { label: "Filter Change", value: "Filter Change" },
                  ]}
                  placeholder={{ label: "Select service type", value: "" }}
                  style={pickerSelectStyles}
                />
                <Ionicons name="chevron-down" size={20} color="#666" style={styles.pickerIcon} />
              </View>
            )}
          />
          {errors.service_type && <Text style={styles.error}>{errors.service_type.message}</Text>}
        </View>

        {/* Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service Address</Text>
          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your complete address"
                multiline
                numberOfLines={2}
                onChangeText={field.onChange}
              />
            )}
          />
          {errors.address && <Text style={styles.error}>{errors.address.message}</Text>}
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Issue Description</Text>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your issue in detail..."
                multiline
                numberOfLines={4}
                onChangeText={field.onChange}
              />
            )}
          />
          {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}
        </View>

        {/* Date and Time Selection */}
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.label}>Preferred Date</Text>
            <Controller
              control={control}
              name="visit_date"
              render={({ field }) => (
                <TouchableOpacity
                  style={styles.dateTimeButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                  <Text style={styles.dateTimeText}>
                    {field.value || 'Select Date'}
                  </Text>
                </TouchableOpacity>
              )}
            />
            {errors.visit_date && <Text style={styles.error}>{errors.visit_date.message}</Text>}
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.label}>Preferred Time</Text>
            <Controller
              control={control}
              name="visit_time"
              render={({ field }) => (
                <TouchableOpacity
                  style={styles.dateTimeButton}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Ionicons name="time-outline" size={20} color="#666" />
                  <Text style={styles.dateTimeText}>
                    {field.value || 'Select Time'}
                  </Text>
                </TouchableOpacity>
              )}
            />
            {errors.visit_time && <Text style={styles.error}>{errors.visit_time.message}</Text>}
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.submitButtonText}>Submitting...</Text>
          ) : (
            <>
              <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" />
              <Text style={styles.submitButtonText}>Book Service</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
  },
  pickerIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateContainer: {
    flex: 1,
    marginRight: 8,
  },
  timeContainer: {
    flex: 1,
    marginLeft: 8,
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
  },
  dateTimeText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#0088CC',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#99ccff',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  error: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: '#333',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: '#333',
  },
});