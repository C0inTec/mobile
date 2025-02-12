import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 15,
  },
  valorContainer: {
    marginBottom: 30,
  },
  labelValor: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    color: "#fff",
    fontSize: 30,
    marginRight: 5,
  },
  inputValor: {
    color: "#fff",
    fontSize: 30,
    flex: 1,
  },
  moeda: {
    color: "#666",
    fontSize: 16,
  },
  dataSection: {
    flexDirection: "row",
    marginBottom: 30,
  },
  dataButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  dataButtonInactive: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  dataButtonText: {
    color: "#000", // Mudando de #fff para #000
    fontWeight: "bold",
  },
  dataButtonTextInactive: {
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    color: "#fff",
    paddingVertical: 10,
  },
  confirmButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles