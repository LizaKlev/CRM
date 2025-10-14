/* eslint-disable @next/next/no-img-element */
import DottedMap from 'dotted-map/without-countries'
import MyMapData from './mapData.json'

const MapComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map = new DottedMap({ map: MyMapData as any })

  const svgMap = map.getSVG({
    radius: 0.22,
    color: 'white',
    shape: 'circle',
    backgroundColor: '#',
  })

  return (
    <div className='bg-card flex flex-col border gap-20 border-border rounded-xl p-4 h-full justify-between'>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between items-center'>
          <p className='text-xs font-semibold text-foreground'>
            Best performing country
          </p>
          <p className='bg-accent border border-primary text-[8px] text-primary rounded-2xl w-fit px-1'>
            Assets
          </p>
        </div>
        <p className='text-[16px] font-bold'>The Philippines</p>
        <div className='flex flex-row gap-0.5 items-baseline'>
          <p className='text-xs font-bold text-chart-green'>$2500</p>
          <p className='text-xs text-chart-green'>(40%)</p>
        </div>
      </div>

      <div className='flex w-auto overflow-hidden'>
        <img
          style={{
            transform: 'scale(1.5) translateX(-70px) translateY(0px)',
            maxWidth: 'none',
          }}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          alt='map'
        />
      </div>
    </div>
  )
}

export default MapComponent
