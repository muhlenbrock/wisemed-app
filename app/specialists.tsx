import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/hooks/hooksRedux';
import { userListData, userListLoading, fetchUsers } from '@/features/users/usersSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Sentry from '@sentry/react-native';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default function SpecialistsScreen() {
  const dispatch = useAppDispatch();
  const doctors = useAppSelector(userListData);
  const doctorsLoading = useAppSelector(userListLoading);
  const { back } = useRouter();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  function handlePressDoctor(doctor: UserInfo, throwError: boolean) {
    Sentry.addBreadcrumb({
      category: 'doctors',
      message: 'Doctor card is pressed ' + doctor.name,
      level: 'info'
    });
    if (throwError) {
      throw new Error('Hello, again, Sentry!');
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={back}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctors</Text>
        <TouchableOpacity>
          <Feather name="sliders" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for doctors"
          placeholderTextColor="gray"
        />
      </View>
      <ScrollView>
        {doctorsLoading && (
          <View style={[styles.containerLoader, styles.horizontal]}>
            <ActivityIndicator size="large" color="#65c4a8" />
          </View>
        )}
        {!doctorsLoading &&
          doctors.map((doctor, index) => (
            <TouchableOpacity
              onPress={() => {
                handlePressDoctor(doctor, doctors.length === index + 1);
              }}
              key={index}
              style={styles.doctorCard}
            >
              <Image source={{ uri: 'https://i.pravatar.cc/300' }} style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>Dr. {doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.email}</Text>
                <View style={styles.ratingContainer}>
                  <Feather name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>
                    {5} ({getRandomInt(2005)} reviews)
                  </Text>
                </View>
              </View>
              {index % 2 === 0 && <View style={styles.onlineIndicator} />}
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    height: 40
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 8,
    padding: 16,
    alignItems: 'center'
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16
  },
  doctorInfo: {
    flex: 1
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  doctorSpecialty: {
    color: 'gray',
    marginVertical: 4
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingText: {
    marginLeft: 4,
    color: 'gray'
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    top: 16,
    right: 16
  },
  containerLoader: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
