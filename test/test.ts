    /// <summary>
    /// 医院设备信息
    /// </summary>
    public class HospitalDevice : CreationAuditedEntity<Guid>
    {
        /// <summary>
        /// 医院ID
        /// </summary>
        public Guid HospitalId { get; set; }

        /// <summary>
        /// 设备品牌
        /// </summary>
        public string Brand { get; set; }

        /// <summary>
        /// 设备型号
        /// </summary>
        public decimal Types { get; set; }

        /// <summary>
        /// 设备数量
        /// </summary>
        public int Amount { get; set; }

    }