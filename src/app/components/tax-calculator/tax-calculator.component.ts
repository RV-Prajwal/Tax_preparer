import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CalculatorResult {
  standardDeduction: number;
  potentialDeductions: number;
  estimatedSavings: number;
  effectiveTaxRate: number;
}

@Component({
  selector: 'app-tax-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './tax-calculator.component.html',
  styleUrl: './tax-calculator.component.scss'
})
export class TaxCalculatorComponent {
  filingStatus: 'single' | 'married' | 'hoh' = 'single';
  annualIncome = 75000;
  hasBusinessIncome = false;
  hasRentalProperty = false;
  hasInvestments = false;
  hasCharitableDonations = false;
  businessExpenses = 0;
  showResults = false;
  result: CalculatorResult | null = null;

  filingStatuses = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married Filing Jointly' },
    { value: 'hoh', label: 'Head of Household' },
  ];

  calculateSavings(): void {
    const standardDeduction = this.getStandardDeduction();
    const potentialDeductions = this.calculatePotentialDeductions();
    const taxableIncome = Math.max(0, this.annualIncome - potentialDeductions);
    const taxableIncomeStandard = Math.max(0, this.annualIncome - standardDeduction);
    
    const taxWithDeductions = this.calculateTax(taxableIncome);
    const taxWithStandard = this.calculateTax(taxableIncomeStandard);
    
    const estimatedSavings = Math.max(0, taxWithStandard - taxWithDeductions);
    const effectiveTaxRate = (taxWithDeductions / this.annualIncome) * 100;

    this.result = {
      standardDeduction,
      potentialDeductions,
      estimatedSavings,
      effectiveTaxRate,
    };

    this.showResults = true;
  }

  private getStandardDeduction(): number {
    const deductions = {
      single: 13850,
      married: 27700,
      hoh: 20800,
    };
    return deductions[this.filingStatus];
  }

  private calculatePotentialDeductions(): number {
    let total = this.getStandardDeduction();

    if (this.hasBusinessIncome) {
      total += this.businessExpenses || 5000;
      total += 2500;
    }

    if (this.hasRentalProperty) {
      total += 8000;
    }

    if (this.hasInvestments) {
      total += 3000;
    }

    if (this.hasCharitableDonations) {
      total += 2000;
    }

    return total;
  }

  private calculateTax(taxableIncome: number): number {
    const brackets2024Single = [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ];

    const brackets2024Married = [
      { limit: 23200, rate: 0.10 },
      { limit: 94300, rate: 0.12 },
      { limit: 201050, rate: 0.22 },
      { limit: 383900, rate: 0.24 },
      { limit: 487450, rate: 0.32 },
      { limit: 731200, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ];

    const brackets = this.filingStatus === 'married' ? brackets2024Married : brackets2024Single;

    let tax = 0;
    let previousLimit = 0;

    for (const bracket of brackets) {
      if (taxableIncome > bracket.limit) {
        tax += (bracket.limit - previousLimit) * bracket.rate;
        previousLimit = bracket.limit;
      } else {
        tax += (taxableIncome - previousLimit) * bracket.rate;
        break;
      }
    }

    return Math.max(0, tax);
  }

  reset(): void {
    this.filingStatus = 'single';
    this.annualIncome = 75000;
    this.hasBusinessIncome = false;
    this.hasRentalProperty = false;
    this.hasInvestments = false;
    this.hasCharitableDonations = false;
    this.businessExpenses = 0;
    this.showResults = false;
    this.result = null;
  }
}
