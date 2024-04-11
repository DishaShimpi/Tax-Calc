function calculateTax() {
    // Clear previous errors
    $(".error-icon").hide();

    let isValid = true;

    // Inputs
    let grossAnnualIncome = $("#grossAnnualIncome").val();
    let extraIncome = $("#extraIncome").val();
    let deductions = $("#deductions").val();
    let ageGroup = $("#age").val();

    // Validation
    if (isNaN(grossAnnualIncome) || grossAnnualIncome === "") {
        $("#grossAnnualIncome").next(".error-icon").show().attr("title", "Please enter numbers only");
        isValid = false;
    }
    if (isNaN(extraIncome) || extraIncome === "") {
        $("#extraIncome").next(".error-icon").show().attr("title", "Please enter numbers only");
        isValid = false;
    }
    if (isNaN(deductions) || deductions === "") {
        $("#deductions").next(".error-icon").show().attr("title", "Please enter numbers only");
        isValid = false;
    }
    if (!ageGroup) {
        $("#age").next(".error-icon").show().attr("title", "This field is mandatory");
        isValid = false;
    }

    if (!isValid) return;

    // Calculation
    let totalIncome = parseFloat(grossAnnualIncome) + parseFloat(extraIncome) - parseFloat(deductions);
    let taxRate = 0;
    let taxPayable = 0;

    if (totalIncome > 800000) {
        switch (ageGroup) {
            case "<40":
                taxRate = 0.30;
                break;
            case "≥40&<60":
                taxRate = 0.40;
                break;
            case "≥60":
                taxRate = 0.10;
                break;
        }

        taxPayable = taxRate * (totalIncome - 800000);
    }

    $("#resultText").text(`Total Tax Payable: ₹${taxPayable.toLocaleString()}`);
    $('#resultModal').modal('show');
}


document.querySelectorAll('.info-button').forEach(function(button) {
    button.addEventListener('click', function() {
        var tooltip = this.querySelector('.tooltip-text');
        // Toggle visibility
        tooltip.style.visibility = (tooltip.style.visibility === 'visible') ? 'hidden' : 'visible';
    });
});
// Add an event listener for the modal close event
$('#resultModal').on('hidden.bs.modal', function (e) {
    // Clear the input fields
    $('#grossAnnualIncome').val('');
    $('#extraIncome').val('');
    $('#deductions').val('');
    $('#age').val('');
});
