import * as React from "react";
import { CardBox } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

interface AttendanceCalculatorFormProps {
  onCalculate: (totalConducted: number, totalAttended: number) => void;
}

export function AttendanceCalculatorForm({
  onCalculate,
}: AttendanceCalculatorFormProps) {
  const [totalConducted, setTotalConducted] = React.useState<number>(0);
  const [totalAttended, setTotalAttended] = React.useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const conducted = totalConducted;
    const attended = totalAttended;

    if (!totalConducted || !totalAttended) {
      return toast.error(
        "Please provide both total classes conducted and classes attended."
      );
    }

    if (isNaN(conducted) || isNaN(attended)) {
      return toast.error("Please enter valid numeric values.");
    }

    if (conducted <= 0) {
      return toast.error("Total classes conducted must be greater than zero.");
    }

    if (attended < 0) {
      return toast.error("Classes attended cannot be a negative value.");
    }

    if (attended > conducted) {
      return toast.error(
        "Classes attended cannot exceed total classes conducted."
      );
    }

    onCalculate(conducted, attended);
  };

  return (
    <CardBox>
      <form onSubmit={handleSubmit}>
        <FieldSet className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="total-conducted">
              Total classes conducted
              <span className="text-xs text-muted-foreground -mb-1">
                till today
              </span>
            </FieldLabel>
            <Input
              id="total-conducted"
              type="number"
              placeholder="0"
              min="0"
              value={totalConducted}
              onChange={(e) => setTotalConducted(Number(e.target.value))}
              className="hide-input-number"
              required
            />
            <FieldDescription>
              Total number of classes that happened
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="attend-classes">
              Classes you attended
              <span className="text-xs text-muted-foreground -mb-1">
                so far
              </span>
            </FieldLabel>
            <Input
              id="attend-classes"
              type="number"
              placeholder="0"
              min="0"
              value={totalAttended}
              onChange={(e) => setTotalAttended(Number(e.target.value))}
              className="hide-input-number"
              required
            />
            <FieldDescription>
              How many classes you were present for
            </FieldDescription>
          </Field>
        </FieldSet>

        <Button type="submit" size="lg" className="mt-8 w-full">
          Calculate My Attendance →
        </Button>
      </form>
    </CardBox>
  );
}
