import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  CalendarDays,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface DueDatePickerProps {
  dueDate?: Date;
  onDateChange?: (date: Date | null) => void;
  size?: "sm" | "default" | "lg";
  className?: string;
}

const DueDatePicker = ({
  dueDate,
  onDateChange,
  size = "sm",
  className = "",
}: DueDatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(dueDate);
  const [selectedTime, setSelectedTime] = useState<string>(
    dueDate ? format(dueDate, "HH:mm") : "09:00"
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const handleSave = () => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const newDate = new Date(selectedDate);
      newDate.setHours(hours, minutes, 0, 0);
      onDateChange?.(newDate);
    }
    setOpen(false);
  };

  const handleRemove = () => {
    setSelectedDate(undefined);
    onDateChange?.(null);
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedDate(dueDate);
    setSelectedTime(dueDate ? format(dueDate, "HH:mm") : "09:00");
    setOpen(false);
  };

  // Helpers
  const formatDateTime = (date: Date) =>
    format(date, "dd/MM/yyyy HH:mm", { locale: vi });

  const isDueSoon = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isOverdue = (date: Date) => new Date() > date;

  const getButtonText = (dueDate?: Date) => {
    if (!dueDate) return "Ngày";
    return formatDateTime(dueDate);
  };

  const getIcon = (dueDate?: Date) => {
    if (!dueDate) return <CalendarDays className="w-4 h-4 mr-2" />;
    if (isOverdue(dueDate)) return <AlertCircle className="w-4 h-4 mr-2" />;
    if (isDueSoon(dueDate)) return <Clock className="w-4 h-4 mr-2" />;
    return <CalendarIcon className="w-4 h-4 mr-2" />;
  };

  const getStatusLabel = (dueDate?: Date) => {
    if (!dueDate) return null;
    if (isOverdue(dueDate)) return "Quá hạn";
    if (isDueSoon(dueDate)) return "Sắp đến hạn";
  };

  const getStatusColor = (dueDate?: Date) => {
    if (!dueDate) return "";
    if (isOverdue(dueDate)) return "text-red-600 bg-red-50 border-red-200";
    if (isDueSoon(dueDate))
      return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getButtonStyle = (dueDate?: Date) => {
    if (!dueDate) return "";
    if (isOverdue(dueDate))
      return "border-red-300 text-red-700 bg-red-200 hover:bg-red-300";
    if (isDueSoon(dueDate))
      return "border-orange-300 text-orange-700 bg-orange-200 hover:bg-orange-300";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-1">
          <Button
            size={size}
            variant="outline"
            className={`justify-start p-4 ${getButtonStyle(
              dueDate
            )} ${className}`}
          >
            {getIcon(dueDate)}
            {getButtonText(dueDate)}
            {getStatusLabel(dueDate) && (
              <span
                className={`text-xs px-1 rounded-sm border text-center w-fit ${getStatusColor(
                  dueDate
                )}`}
              >
                {getStatusLabel(dueDate)}
              </span>
            )}
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="w-auto max-w-fit">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Chọn ngày đến hạn
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Calendar */}
          <div className="space-y-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date("1900-01-01")}
            />
          </div>

          {/* Time Input */}
          <div className="space-y-3">
            <Input
              type="time"
              value={selectedTime}
              onChange={(e) => handleTimeChange(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col justify-between gap-2">
            <Button
              onClick={handleSave}
              disabled={!selectedDate}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Lưu
            </Button>
            {dueDate && (
              <Button
                variant="outline"
                onClick={handleRemove}
                className="text-red-600 hover:bg-red-50"
              >
                Gỡ bỏ
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DueDatePicker;
