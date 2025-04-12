export default function EvidenceCard() {
  return (
    <>
      <div className="flex flex-col p-4 border border-zinc-200 rounded-xl gap-2">
        <div className="flex flex-col flex-wrap justify-between items-baseline mb-2">
          <div className="flex items-center gap-2 font-semibold text-lg">Bukti Pelanggaran</div>
        </div>
        <div className="">
          <div className="flex flex-wrap gap-2">
            <img className="flex-1 max-h-96 object-contain bg-zinc-100" src="https://c8.alamy.com/comp/HXRW5G/vietnamese-families-heading-to-lunar-new-year-celebrations-in-hanoi-HXRW5G.jpg" alt="" />
            <div className="flex-1 flex flex-col md:flex-row flex-nowrap gap-2 items-start">
              <div className="flex-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Latest_motor_vehicle_number_plate_designs_in_Indonesia.jpg/1200px-Latest_motor_vehicle_number_plate_designs_in_Indonesia.jpg" alt="" className="" />
              </div>
              <div className="flex-1">
                <img src="https://placehold.co/600x400" alt="" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
