$(document).ready(function() {
      // Navigation between screens
      function showScreen(screenId) {
        $('.page-transition').addClass('page-hidden');
        setTimeout(() => {
          $(`#${screenId}`).removeClass('page-hidden');
        }, 100);
      }
      
      // Initialize with splash screen
      showScreen('splash-screen');
      
      // Get Started button click
      $('#get-started-btn').click(function() {
        showScreen('input-screen');
      });
      
      // Form section toggle
      $('.form-section-header').click(function() {
        const section = $(this).closest('.form-section');
        section.toggleClass('active');
        if (section.hasClass('active')) {
          $(this).find('i.fas').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        } else {
          $(this).find('i.fas').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
      });
      
      // File upload handling
      $('#dropzone').click(function() {
        $('#file-upload').click();
      });
      
      $('#dropzone').on('dragover', function(e) {
        e.preventDefault();
        $(this).addClass('dragover');
      });
      
      $('#dropzone').on('dragleave', function(e) {
        e.preventDefault();
        $(this).removeClass('dragover');
      });
      
      $('#dropzone').on('drop', function(e) {
        e.preventDefault();
        $(this).removeClass('dragover');
        
        const files = e.originalEvent.dataTransfer.files;
        if (files.length > 0) {
          const file = files[0];
          if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
            handleCsvFile(file);
          } else {
            alert('Please upload a CSV file.');
          }
        }
      });
      
      $('#file-upload').change(function() {
        const file = this.files[0];
        if (file) {
          handleCsvFile(file);
        }
      });
      
      function handleCsvFile(file) {
        // In the prototype, we just show the filename
        const filename = file.name;
        $('#dropzone p').text(`Selected: ${filename}`);
      }
      
      // Analyze button click - show loading screen
      $('#analyze-btn').click(function() {
        showScreen('loading-screen');
        simulateLoading();
      });
      
      // Simulate loading progress
      function simulateLoading() {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          $('#progress-value').css('width', `${progress}%`);
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              showScreen('results-screen');
              initCharts();
            }, 500);
          }
        }, 200);
      }
      
      // Restart button
      $('#restart-btn').click(function() {
        showScreen('input-screen');
      });
      
      // Recommendation filters
      $('.recommendation-filter').click(function() {
        $('.recommendation-filter').removeClass('active bg-green-500 text-white').addClass('bg-gray-200');
        $(this).addClass('active bg-green-500 text-white').removeClass('bg-gray-200');
      });
      
      // Initialize charts when results screen is shown
      function initCharts() {
        // Carbon footprint chart
        const carbonCtx = document.getElementById('carbon-chart').getContext('2d');
        new Chart(carbonCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              data: [5.8, 5.6, 5.5, 5.3, 5.2, 5.2],
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderWidth: 2,
              pointRadius: 0,
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } },
            responsive: true,
            maintainAspectRatio: false
          }
        });
        
        // Water usage chart
        const waterCtx = document.getElementById('water-chart').getContext('2d');
        new Chart(waterCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              data: [75, 78, 80, 83, 85, 82],
              borderColor: '#0EA5E9',
              backgroundColor: 'rgba(14, 165, 233, 0.1)',
              borderWidth: 2,
              pointRadius: 0,
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } },
            responsive: true,
            maintainAspectRatio: false
          }
        });
        
        // Energy usage chart
        const energyCtx = document.getElementById('energy-chart').getContext('2d');
        new Chart(energyCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              data: [450, 440, 435, 425, 420, 420],
              borderColor: '#FBBF24',
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              borderWidth: 2,
              pointRadius: 0,
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } },
            responsive: true,
            maintainAspectRatio: false
          }
        });
        
        // Waste generation chart
        const wasteCtx = document.getElementById('waste-chart').getContext('2d');
        new Chart(wasteCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              data: [4.5, 4.2, 3.9, 3.7, 3.5, 3.4],
              borderColor: '#8B5CF6',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              borderWidth: 2,
              pointRadius: 0,
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } },
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
      
      // Export buttons
      $('#export-pdf-btn, #export-csv-btn, #share-results-btn').click(function() {
        alert("This is a prototype. In the full version, this functionality will be connected to a real API.");
      });
      
      // Profile and language toggles
      $('#profile-button, #language-toggle, #share-button, #learn-more-btn').click(function() {
        alert("This is a prototype. In the full version, this functionality will be connected to a real API.");
    });
});