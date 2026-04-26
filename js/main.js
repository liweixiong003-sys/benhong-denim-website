document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal animation on scroll
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    
    // Initial trigger
    setTimeout(reveal, 100);

    initEChartsMap();
});

// Initialize ECharts Map
function initEChartsMap() {
    const mapContainer = document.getElementById('echarts-map');
    if (!mapContainer) return;

    fetch('assets/world.json')
        .then(response => response.json())
        .then(worldJson => {
            echarts.registerMap('world', worldJson);
            const myChart = echarts.init(mapContainer);

            // Adjust labels to not overlap
            const partnerData = [
                { name: 'Russia\n俄罗斯', value: [90.0, 60.0], label: { position: 'right' } },
                { name: 'Germany\n德国', value: [10.4515, 51.1657], label: { position: 'top' } },
                { name: 'France\n法国', value: [2.2137, 46.2276], label: { position: 'left' } },
                { name: 'Italy\n意大利', value: [12.5674, 41.8719], label: { position: 'bottom' } },
                { name: 'Poland\n波兰', value: [19.1451, 51.9194], label: { position: 'right' } },
                { name: 'Netherlands\n荷兰', value: [5.2913, 52.1326], label: { position: 'top', offset: [-10, -5] } }
            ];

            const option = {
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        if (params.seriesType === 'effectScatter') {
                            return params.name.replace('\n', '<br/>');
                        }
                        if (params.name) {
                            return params.name;
                        }
                    },
                    backgroundColor: 'rgba(10, 10, 10, 0.9)',
                    borderColor: '#FFD700',
                    borderWidth: 1,
                    textStyle: { color: '#FFD700', fontFamily: 'Cinzel, sans-serif' }
                },
                geo: {
                    map: 'world',
                    roam: true, // Allow zooming to eliminate white space if user wants
                    zoom: 1.5,
                    center: [45, 45], // Focus on Eurasia
                    itemStyle: {
                        areaColor: '#1a1a1a', // Very dark grey map
                        borderColor: '#333', // Boundaries visible
                        borderWidth: 1
                    },
                    emphasis: {
                        itemStyle: {
                            areaColor: '#2b2302', // Premium gold glow for the territory
                            borderColor: '#FFD700',
                            borderWidth: 1.5,
                            shadowColor: 'rgba(255, 215, 0, 0.5)',
                            shadowBlur: 15
                        },
                        label: { show: false } // Hide default labels
                    }
                },
                series: [
                    {
                        name: 'Partners',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: partnerData,
                        symbolSize: 10,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke',
                            scale: 4
                        },
                        itemStyle: {
                            color: '#FFD700',
                            shadowBlur: 10,
                            shadowColor: '#FFD700'
                        },
                        label: {
                            show: true,
                            formatter: '{b}',
                            color: '#FFD700',
                            fontSize: 12,
                            fontFamily: 'Cinzel, Noto Sans SC',
                            distance: 8,
                            textBorderColor: '#000',
                            textBorderWidth: 2
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 14,
                                fontWeight: 'bold'
                            }
                        }
                    }
                ]
            };

            myChart.setOption(option);
            window.addEventListener('resize', () => myChart.resize());
        })
        .catch(error => console.error('Error loading map:', error));
}
