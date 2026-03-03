import { useEffect, useState } from "react"
import { Spinner } from "./Spinner"
import { api } from "../request/Api"
import { dateTime } from "../utils/DateTime"
import { GrGroup } from "react-icons/gr"
import { PiStudent } from "react-icons/pi"
import { FaSchool } from "react-icons/fa"
import { DynamicFilter } from "../widgets/DynamicFilter"

export const StudentLogsFilter = ({ onChange }) => {
    const today = dateTime.now().format('ym').toString();

    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedSchoolId, setSelectedSchoolId] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(today);

    const [availableGroups, setAvailableGroups] = useState([]);
    const [availableStudents, setAvailableStudents] = useState([]);

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
    }, [selectedSchoolId, schools]);

    // Update students when group changes
    useEffect(() => {
        const group = availableGroups.find(g => g.id === selectedGroupId)
        if (group) {
            setAvailableStudents(group.attributes.students || [])
        } else {
            setAvailableStudents([])
            setSelectedStudentId('')
        }
    }, [selectedGroupId, availableGroups]);

    // Notify parent of filter change
    useEffect(() => {
        if (!loading) {
            onChange?.({
                schoolId: selectedSchoolId,
                groupId: selectedGroupId,
                studentId: selectedStudentId,
                month: selectedMonth
            })
        }
    }, [selectedSchoolId, selectedGroupId, selectedStudentId, selectedMonth, loading, onChange]);

    // Fetch data internally
    useEffect(() => {
        api.school.list().then((response) => {
            setSchools(response.data.data);
        }).catch((err) => {
            
        }).finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner show inline />

    return(
        <DynamicFilter 
            dateValue={selectedMonth}
            onDateChange={(e)=>setSelectedMonth(e.target.value)}
            items={[
                {
                    icon: FaSchool,
                    position: 'LEFT',
                    items: schools.map((school)=>({
                        title: school.attributes.name,
                        onClick: ()=>setSelectedSchoolId(school.id)
                    })),
                    noItem: {
                        title: 'No schools available'
                    }
                },{
                    icon: GrGroup,
                    position: 'RIGHT',
                    items: availableGroups.map((group)=>({
                        title: group.attributes.name,
                        onClick: ()=>setSelectedGroupId(group.id)
                    })),
                    noItem: {
                        title: 'Select a school first'
                    }
                },{
                    icon: PiStudent,
                    position: 'RIGHT',
                    items: availableStudents.map((student)=>({
                        title: student.attributes.fullName,
                        onClick: ()=>setSelectedStudentId(student.id)
                    })),
                    noItem: {
                        title: 'Select a group first'
                    }
                }
            ]}
        />
    )
}