import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../flex-app/services/supabase';

const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced', 'Elite'];
const matchingGoals = ['Workouts', 'Friendship', 'Dating'];

export default function ProfileSetup() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bio: '',
    fitnessLevel: '',
    gymLocation: '',
    goals: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.age || !formData.fitnessLevel) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: formData.name,
          age: parseInt(formData.age),
          bio: formData.bio,
          fitness_level: formData.fitnessLevel,
          gym_location: formData.gymLocation,
          goals: formData.goals,
          created_at: new Date().toISOString(),
        });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Profile created successfully!', [
          { text: 'OK', onPress: () => router.push('/main') }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <Text style={styles.subtitle}>Help us find the perfect matches for you</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name *"
        value={formData.name}
        onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
      />

      <TextInput
        style={styles.input}
        placeholder="Age *"
        value={formData.age}
        onChangeText={(text) => setFormData(prev => ({ ...prev, age: text }))}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Bio (optional)"
        value={formData.bio}
        onChangeText={(text) => setFormData(prev => ({ ...prev, bio: text }))}
        multiline
        numberOfLines={3}
      />

      <TextInput
        style={styles.input}
        placeholder="Gym Location"
        value={formData.gymLocation}
        onChangeText={(text) => setFormData(prev => ({ ...prev, gymLocation: text }))}
      />

      <Text style={styles.sectionTitle}>Fitness Level *</Text>
      <View style={styles.optionsContainer}>
        {fitnessLevels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.option,
              formData.fitnessLevel === level && styles.selectedOption
            ]}
            onPress={() => setFormData(prev => ({ ...prev, fitnessLevel: level }))}
          >
            <Text style={[
              styles.optionText,
              formData.fitnessLevel === level && styles.selectedOptionText
            ]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Matching Goals</Text>
      <View style={styles.optionsContainer}>
        {matchingGoals.map((goal) => (
          <TouchableOpacity
            key={goal}
            style={[
              styles.option,
              formData.goals.includes(goal) && styles.selectedOption
            ]}
            onPress={() => handleGoalToggle(goal)}
          >
            <Text style={[
              styles.optionText,
              formData.goals.includes(goal) && styles.selectedOptionText
            ]}>
              {goal}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating Profile...' : 'Complete Profile'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#222',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 