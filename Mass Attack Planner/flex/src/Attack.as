package
{
	import flash.geom.Point;
	
	import flashx.textLayout.conversion.ConverterBase;

	public class Attack
	{
		private var _target:Point;
		private var _origin:Point;
		private var _landingDate:Date;
		private var _launchDate:Date;
		private var _attackUnitType:String;
		private var _originName:String;
		private var _targetName:String;
		
		private var _originId:Number;
		private var _targetId:Number;
		
		private var _support:Boolean;
		
		public function Attack(origin:Point, originName:String, originId:Number, 
							   target:Point, targetName:String, targetId:Number, 
							   landingDate:Date, launchDate:Date, 
							   support:Boolean, attackUnitType:String=null)
		{
			_origin = new Point(origin.x, origin.y);
			_target = new Point(target.x, target.y);
			_originId = originId;
			_targetId = targetId;
			_originName = originName;
			_targetName = targetName;
			
			_landingDate = new Date(landingDate);
			_launchDate = new Date(launchDate);
			_attackUnitType = attackUnitType;
			_support = support;
		}
		
		public static function formatTimerPeriod(ts:Number):String {
			var d:Number = Math.floor(ts/86400);
			var h:Number = Math.floor((ts - d*86400)/3600);
			var m:Number = Math.floor((ts - d*86400 - h*3600)/60);
			var s:Number = ts - d*86400 - h*3600 - m*60; 
						
			var str:String = "";
			if(d > 0) str += String(d) + " d ";
			if(h > 0) str += String(h) + " hr ";
			if(m > 0) str += String(m) + " min ";
			if(s > 0) str += String(Math.round(s)) + " sec";
			return str;
		}
		
		public static function calculateTravelTime(o:Point, t:Point, unit:String, worldSpeed:Number):Number {
			var travelTime:Number = calculateDistance(o, t)*calculateArmySpeed(unit, worldSpeed);
			return travelTime; //in seconds
		}
		
		//utc time
		public static function calculateLaunchTime(travelTime_seconds:Number,  landTime:Date):Date {
			var d:Date = new Date(landTime.valueOf()-travelTime_seconds*1000);
//			d.setTime(d.getTime() + (d.getTimezoneOffset() * 60000));
			return d;
		}
		
		public static function calculateDistance(start:Point, end:Point):Number {
			var dy:Number = start.y - end.y;
			var dx:Number = start.x - end.x;
			
			if(dy % 2) {
				dx += start.y % 2 ? 0.5 : -0.5;
			}
			
			return Math.sqrt(dx * dx + dy * dy * 0.75);
		}
		
		public static function calculateArmySpeed(unit:String, worldSpeed:Number):Number {
			var baseUnitSpeed:Number;
			
			switch (unit) {
				case Units.SPEAR:
					baseUnitSpeed = Units.SPEAR_SPEED;
					break;
				case Units.SWORD:
					baseUnitSpeed = Units.SWORD_SPEED;
					break;
				case Units.AXE:
					baseUnitSpeed = Units.AXE_SPEED;
					break;
				case Units.ARCHER:
					baseUnitSpeed = Units.ARCHER_SPEED;
					break;
				case Units.LC:
					baseUnitSpeed = Units.LC_SPEED;
					break;
				case Units.MA:
					baseUnitSpeed = Units.MA_SPEED;
					break;
				case Units.HC:
					baseUnitSpeed = Units.HC_SPEED;
					break;
				case Units.RAM:
					baseUnitSpeed = Units.RAM_SPEED;
					break;
				case Units.CAT:
					baseUnitSpeed = Units.CAT_SPEED;
					break;
				case Units.SERK:
					baseUnitSpeed = Units.SERK_SPEED;
					break;
				case Units.TREB:
					baseUnitSpeed = Units.TREB_SPEED;
					break;
				case Units.SNOB:
					baseUnitSpeed = Units.SNOB_SPEED;
					break;
				case Units.KNIGHT:
					baseUnitSpeed = Units.KNIGHT_SPEED;
					break;
			}
			return int((baseUnitSpeed/worldSpeed*60)*100)/100; //in seconds
		}
		
		public function get targetId():Number
		{
			return _targetId;
		}

		public function set targetId(value:Number):void
		{
			_targetId = value;
		}

		public function get originId():Number
		{
			return _originId;
		}

		public function set originId(value:Number):void
		{
			_originId = value;
		}

		public function get targetName():String
		{
			return _targetName;
		}

		public function set targetName(value:String):void
		{
			_targetName = value;
		}

		public function get originName():String
		{
			return _originName;
		}

		public function set originName(value:String):void
		{
			_originName = value;
		}

		public function get attackUnitType():String
		{
			return _attackUnitType;
		}
		
		public function get support():Boolean {
			return _support;
		}

		public function set attackUnitType(value:String):void
		{
			_attackUnitType = value;
		}

		public function get launchDate():Date
		{
			return _launchDate;
		}

		public function set launchDate(value:Date):void
		{
			_launchDate = value;
		}

		public function get landingDate():Date
		{
			return _landingDate;
		}

		public function set landingDate(value:Date):void
		{
			_landingDate = value;
		}

		public function get origin():Point
		{
			return _origin;
		}

		public function set origin(value:Point):void
		{
			_origin = value;
		}

		public function get target():Point
		{
			return _target;
		}

		public function set target(value:Point):void
		{
			_target = value;
		}
	}
}