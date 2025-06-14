// 切割圆对象
class SplitCircle 
{
    constructor(nx, ny, nRadius, angle, greenRatio) 
    {
        this.nx = nx;                       // 圆心x归一化坐标
        this.ny = ny;                       // 圆心y归一化坐标
        this.nRadius = nRadius;             // 圆归一化半径
        this.angle = angle;                 // 圆初始的旋转
        this.greenRatio = greenRatio;       // 绿色部分占比

        this.rotatedSpeed = random(1, 4);   // 自转速度
        this.activatedRotation = false;     // 是否开启自转的标志
        
        this.hasFallen = false;             // 是否掉落的标志
        this.vy = 0;                        // 垂直掉落速度
        this.vx = 0;                        // 水平掉落速度
        this.gravity = 0.6;                 // 重力加速度
        this.damping = 0.8;                 // 每次反弹的能量衰减系数
        this.isStopped = false;             // 是否已完全停止的标志
        this.stoppedTime = 0;               // 完全停下的时间
        this.isDead = false;                // 是否死亡的标志
    }

    // 方法：更新
    update(dir)
    {
        if (!this.activatedRotation) return;
        this.angle += this.rotatedSpeed * dir;

        if (this.hasFallen && !this.isStopped)
        {
            // 触发掉落时，根据dir方向初始化水平方向的速度
            if (this.vx === 0 && this.vy === 0)
            {
                this.vx = random(0.1, 1) * dir;
            }
            // 增加垂直方向的速度
            this.vy += this.gravity;

            // 计算圆的坐标和半径
            let xpos = this.nx * width;
            let ypos = this.ny * height;
            let radius = this.nRadius * width;

            // 基于水平和垂直方向的速度更新位置
            xpos += this.vx;
            ypos += this.vy;

            // 检测是否与地面碰撞
            let floor = height * 0.81;
            if (ypos + radius > floor)
            {
                ypos = floor - radius;
                // 将速度反向并衰减
                this.vy *= -this.damping;
                // 水平速度也衰减
                this.vx *= 0.95; 
                // 判断是否停止
                if (abs(this.vy) < 1 && !this.isStopped)
                {
                    this.isStopped = true;
                    this.vy = 0;
                    this.vx = 0;

                    // 记录完全停下的时间
                    this.stoppedTime = millis() / 1000;
                }
            }
            
            // 更新归一化坐标
            this.nx = xpos / width;
            this.ny = ypos / height;
        }

        // 判断是否消失
        if (this.isStopped)
        {
            if (millis()/1000 - this.stoppedTime > 2)
            {
                this.isDead = true;
            }
        }
    }

    // 方法：显示圆

    display() 
    {
        // 计算在画布中的位置
        let xpos = width * this.nx;
        let ypos = height * this.ny;
        let radius = width * this.nRadius;
        drawSplitCircle(xpos, ypos, radius, this.angle, this.greenRatio);
    }
}