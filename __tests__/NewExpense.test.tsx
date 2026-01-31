import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import NewExpensePage from '../app/transactions/new-expense/page'
import { FinanceContext } from '../context/FinanceContext'
import { useRouter } from 'next/navigation'

// Mock useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

// Mock Finance Context
const mockAddExpense = jest.fn()
const mockContextValue = {
    user: { id: 'u1', name: 'Test User', email: 'test@example.com', avatar: '' },
    group: { id: 'g1', name: 'Test Group', owner_id: 'u1', members: [], currency: 'BRL' },
    accounts: [],
    incomes: [],
    expenses: [],
    financings: [],
    addExpense: mockAddExpense,
    addIncome: jest.fn(),
    getMonthlySummary: jest.fn(),
}

describe('NewExpensePage', () => {
    const pushMock = jest.fn()

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
            back: jest.fn(),
        })
        mockAddExpense.mockClear()
        pushMock.mockClear()
    })

    it('renders the form correctly', () => {
        render(
            <FinanceContext.Provider value={mockContextValue}>
                <NewExpensePage />
            </FinanceContext.Provider>
        )

        expect(screen.getByText('Nova Despesa')).toBeInTheDocument()
        expect(screen.getByText('Salvar Despesa')).toBeInTheDocument()
    })

    it('updates amount input', () => {
        render(
            <FinanceContext.Provider value={mockContextValue}>
                <NewExpensePage />
            </FinanceContext.Provider>
        )

        // Select all inputs, assumining amount is first or identifiable
        const inputs = screen.getAllByRole('textbox')
        const amountInput = inputs[0] // Since amount is at the top

        fireEvent.change(amountInput, { target: { value: '50,00' } })
        expect(amountInput).toHaveValue('50,00')
    })

    it('submits the form and redirects', async () => {
        render(
            <FinanceContext.Provider value={mockContextValue}>
                <NewExpensePage />
            </FinanceContext.Provider>
        )

        // Simulate entering amount
        const inputs = screen.getAllByRole('textbox')
        // We update both just to be safe or target specific index
        // Index 0 is Amount, Index 1 is Description from structure
        const amountInput = inputs[0]
        fireEvent.change(amountInput, { target: { value: '50,00' } })

        // Simulate click save
        const saveButton = screen.getByText('Salvar Despesa')
        fireEvent.click(saveButton)

        // Verify addExpense was called
        expect(mockAddExpense).toHaveBeenCalledTimes(1)

        // We expect the amount to be parsed (50) and descript defaults
        expect(mockAddExpense).toHaveBeenCalledWith(expect.objectContaining({
            amount: 50,
            description: 'Despesa sem descrição',
        }))

        // Verify redirect to dashboard
        expect(pushMock).toHaveBeenCalledWith('/dashboard')
    })
})
