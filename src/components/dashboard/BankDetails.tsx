import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BankDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Bank Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>View and update your bank account information here.</p>
        {/* Add bank details form or display here */}
      </CardContent>
    </Card>
  )
}

