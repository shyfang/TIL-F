function useChart() {
  const chartRef = useRef(null)
  const chartMaskRef = useRef(null)
  const chartXRef = useRef(null)
  const chartYRef = useRef(null)

  const [valueMap, setValueMap] = useState(new Map());

  const [initialized, setInitialized] = useState(false);
  const [hasPaint, setHasPaint] = useState(false);

  // chart方法

  function initChart() {
    // 初始化逻辑    
  }

  function drawChart() {
    // 绘制逻辑
  }

  return {
    contextRef,
    maskContextRef,
    valueMap,
    initialized, 
    hasPaint,
    initChart,
    drawChart    
  }

}