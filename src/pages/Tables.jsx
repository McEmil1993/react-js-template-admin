import { useState } from 'react'
import Table from '../components/Table'
import Modal from '../components/Modal'
import Button from '../components/Button'
import { Plus } from 'lucide-react'

const Tables = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive', role: 'User' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'active', role: 'Moderator' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'inactive', role: 'User' },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', role: '' })

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'role', label: 'Role' },
  ]

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({ name: item.name, email: item.email, role: item.role })
    setIsModalOpen(true)
  }

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      setData(data.filter((d) => d.id !== item.id))
    }
  }

  const handleStatusChange = (item, newStatus) => {
    setData(data.map((d) => d.id === item.id ? { ...d, status: newStatus } : d))
  }

  const handleSave = () => {
    if (editingItem) {
      setData(data.map((d) => 
        d.id === editingItem.id 
          ? { ...d, ...formData }
          : d
      ))
    } else {
      const newItem = {
        id: data.length + 1,
        ...formData,
        status: 'active'
      }
      setData([...data, newItem])
    }
    setIsModalOpen(false)
    setEditingItem(null)
    setFormData({ name: '', email: '', role: '' })
  }

  const handleAddNew = () => {
    setEditingItem(null)
    setFormData({ name: '', email: '', role: '' })
    setIsModalOpen(true)
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tables
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Manage your data with interactive tables
          </p>
        </div>
        <Button onClick={handleAddNew} variant="primary" className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2 inline" />
          Add New
        </Button>
      </div>

      <Table
        data={data}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingItem(null)
          setFormData({ name: '', email: '', role: '' })
        }}
        title={editingItem ? 'Edit User' : 'Add New User'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="User">User</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false)
                setEditingItem(null)
                setFormData({ name: '', email: '', role: '' })
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Tables
