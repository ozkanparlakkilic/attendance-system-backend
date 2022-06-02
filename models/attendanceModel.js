import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema(
	{
		expire_at: { type: Date, default: Date.now, expires: '180d' },
		classId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'class'
		},
		absent: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'students'
			}
		]
	},
	{
		timestamps: true
	}
);

const Attendance = mongoose.model('attendance', attendanceSchema);

export default Attendance;
