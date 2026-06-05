import {
  TextField,
  Button,
  MenuItem,
  Select,
  List,
  ListItem,
  Typography,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from '../api/axios'

export default function Payments() {
  const [amount, setAmount] = useState<number>(0);
  const [familyId, setFamilyId] = useState<string>("");
  const [payments, setPayments] = useState<any[]>([]);
  const [families, setFamilies] = useState<any[]>([]);

  // ✅ Fetch families
  const fetchFamilies = async () => {
    const res = await api.get('/families');
    setFamilies(res.data);

    console.log("family id", res.data )

    // MongoDB uses _id
    if (res.data.length) {
      setFamilyId(res.data[0].id);
    }
  };

  // ✅ Fetch payments
  const fetchPayments = async () => {
    const res = await api.get('/payments');
    setPayments(res.data);
  };

  useEffect(() => {
    fetchFamilies();
    fetchPayments();
  }, []);

  // ✅ Add payment
  const addPayment = async () => {
    if (!familyId || !amount) return alert("Enter all fields");

    await api.post('/payments', {
      familyId,
      amount,
    });

    setAmount(0);
    fetchPayments();
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Payments
      </Typography>

      <Box mb={2}>
        <FormControl sx={{ mr: 2, minWidth: 200 }}>
          <InputLabel>Family</InputLabel>
          <Select
            label="Family"
            value={familyId || ""}
            onChange={(e) => setFamilyId(String(e.target.value))}
          >
            {families.map((f) => (
              <MenuItem key={f.id} value={f.id}>
                {f.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="number"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          sx={{ mr: 2 }}
        />

        <Button variant="contained" onClick={addPayment}>
          Pay
        </Button>
      </Box>

      <List>
        {payments.map((p) => (
          <ListItem key={p.id}>
            {/* populated family */}
            {p.familyId?.name} - ₹{p.amount} (Fine: ₹{p.fine})
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
