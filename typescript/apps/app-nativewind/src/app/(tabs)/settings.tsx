import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { authClient } from '@/lib/auth-client';

export default function SettingsTab() {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      Alert.alert('エラー', 'ログアウトに失敗しました');
    }
  };

  if (isPending) {
    return (
      <View style={styles.container}>
        <Text>読み込み中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>設定</Text>
      
      {session?.user && (
        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>アカウント情報</Text>
          <View style={styles.userInfo}>
            <Text style={styles.label}>メールアドレス:</Text>
            <Text style={styles.value}>{session.user.email}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>名前:</Text>
            <Text style={styles.value}>{session.user.name || '未設定'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>ユーザーID:</Text>
            <Text style={styles.value}>{session.user.id}</Text>
          </View>
        </View>
      )}
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>ログアウト</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  accountSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  userInfo: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});