import mongoose, { Schema } from "mongoose";
import { ITableSession } from "../types/tableSession";
import { TableSessionStatus, TableSessionType } from "../constants/enum";

const tableSessionSchema = new Schema<ITableSession>({
  tableId: { type: Schema.Types.ObjectId, ref: "table", required: true },
  type: {
    type: String,
    enum: Object.values(TableSessionType),
  },
  status: {
    type: String,
    enum: Object.values(TableSessionStatus),
    default: TableSessionStatus.ACTIVE,
  },
  timeStart: Date,
  timeEnd: Date,
});

export const TableSession =
  mongoose.models.TableSession ||
  mongoose.model<ITableSession>("TableSession", tableSessionSchema);
