import { useEffect, useState } from "react"
import { DatePicker } from "./DatePicker"
import { Spinner } from "../components/Spinner"
import { api } from "../request/Api"
import { dateTime } from "../utils/DateTime"

export const StudentLogsFilter = ({ onChange }) => {
    const today = dateTime.now().format('ym').toString();

    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedSchoolId, setSelectedSchoolId] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [selectedMonthId, setSelectedMonthId] = useState(today);

    const [availableGroups, setAvailableGroups] = useState([]);
    const [availableStudents, setAvailableStudents] = useState([]);

    // Fetch data internally
    useEffect(() => {
        api.school.list()
            .then((response) => setSchools(response.data.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    // Update groups when school changes
    useEffect(() => {
        const school = schools.find(s => s.id === selectedSchoolId)
        if (school) {
            setAvailableGroups(school.attributes.groups || [])
        } else {
            setAvailableGroups([])
            setSelectedGroupId('')
        }
        setAvailableStudents([])
        setSelectedStudentId("")
    }, [selectedSchoolId, schools])

    // Update students when group changes
    useEffect(() => {
        const group = availableGroups.find(g => g.id === selectedGroupId)
        if (group) {
            setAvailableStudents(group.attributes.students || [])
        } else {
            setAvailableStudents([])
            setSelectedStudentId('')
        }
    }, [selectedGroupId, availableGroups])

    // Notify parent of filter change
    useEffect(() => {
        if (!loading) {
            onChange?.({
                schoolId: selectedSchoolId,
                groupId: selectedGroupId,
                studentId: selectedStudentId,
                month: selectedMonthId
            })
        }
    }, [selectedSchoolId, selectedGroupId, selectedStudentId, selectedMonthId, loading, onChange])

    if (loading) return <Spinner show inline />

    return (
        <div className="btn-group border mb-4">
            <div className="d-md-flex">
                <span className="">
                    <DatePicker
                        month
                        value={selectedMonthId}
                        onChange={e => setSelectedMonthId(e.target.value)}
                        className="w-100"
                    />
                </span>
                <select
                    className="form-select form-select-sm border-0 rounded-0 shadow-none"
                    value={selectedSchoolId}
                    onChange={e => setSelectedSchoolId(e.target.value)}
                    title="Select School"
                >
                    <option hidden value="">Select School</option>
                    {schools.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.attributes.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="d-md-flex">
                <select
                    className="form-select form-select-sm border-0 rounded-0 shadow-none"
                    value={selectedGroupId}
                    onChange={e => setSelectedGroupId(e.target.value)}
                    disabled={!selectedSchoolId || availableGroups.length === 0}
                    title="Select Group"
                >
                    <option hidden value="">Select Group</option>
                    {availableGroups.map(g => (
                        <option key={g.id} value={g.id}>
                            {g.attributes.name}
                        </option>
                    ))}
                </select>

                {/* Student dropdown */}
                <select
                    className="form-select form-select-sm border-0 rounded-0 shadow-none"
                    value={selectedStudentId}
                    onChange={e => setSelectedStudentId(e.target.value)}
                    disabled={!selectedGroupId || availableStudents.length === 0}
                    title="Select Student"
                >
                    <option hidden value="">Select Student</option>
                    {availableStudents.map(s => (
                        <option key={s.id} value={s.id}>
                            {s.attributes.fullName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}