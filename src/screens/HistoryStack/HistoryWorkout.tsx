import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { HistoryNavProps } from './HistoryParamList';
import { formatStringDate } from '../../utils/dateFormat';
import { List, Subheading, Title, useTheme, Text } from 'react-native-paper';
import { Fontisto } from '@expo/vector-icons';
import PreferenceContext from '../../contexts/PreferenceContext';

const HistoryWorkout: React.FC<HistoryNavProps<'HistoryWorkout'>> = ({
  route
}) => {
  const { colors } = useTheme();
  const { weightMeasurement } = useContext(PreferenceContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.calendarText}>
          <Fontisto name='date' size={24} color={colors.primary} />
          <Text style={{ alignSelf: 'flex-end', paddingLeft: 5 }}>
            {formatStringDate(route.params.workout.createdAt)}
          </Text>
        </View>
        {route.params.workout.exercises.map((exercise, index) => {
          return (
            <View key={`${exercise.exerciseName}-${index}`}>
              <List.Section>
                <View style={styles.exerciseContainer}>
                  <View style={{ flex: 1 }}>
                    <List.Item
                      title={`${index + 1}. ${exercise.exerciseName}`}
                    />
                  </View>
                  <View
                    style={[
                      styles.exerciseInfoContainer,
                      { backgroundColor: colors.accent }
                    ]}>
                    <View style={styles.headerContainer}>
                      <View style={styles.centerColumns}>
                        <Subheading>Set</Subheading>
                      </View>
                      <View style={styles.centerColumns}>
                        <Subheading>Reps achieved</Subheading>
                      </View>
                      <View style={styles.centerColumns}>
                        <Subheading>Weight used</Subheading>
                      </View>
                    </View>
                    {exercise.volumeSets.map((volumeSet) => {
                      return (
                        <View
                          key={volumeSet.set}
                          style={styles.headerContainer}>
                          <View style={styles.centerColumns}>
                            <Text>{volumeSet.set}</Text>
                          </View>
                          <View style={styles.centerColumns}>
                            <Text>{volumeSet.reps}</Text>
                          </View>
                          <View style={styles.centerColumns}>
                            <Text>
                              {volumeSet.weight} {weightMeasurement}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </List.Section>
            </View>
          );
        })}
        <Title>Notes</Title>
        {route.params.workout.notes ? (
          <Text>{route.params.workout.notes}</Text>
        ) : (
          <Text>You haven't written any notes for this workout.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  calendarText: { flex: 1, flexDirection: 'row' },
  exerciseContainer: { flex: 1, width: '100%' },
  exerciseInfoContainer: {
    borderRadius: 15,
    paddingVertical: 10,
    elevation: 5
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  centerColumns: { flex: 1, alignItems: 'center' }
});

export default HistoryWorkout;
