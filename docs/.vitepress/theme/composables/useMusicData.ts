import { ref } from 'vue';
import { data } from '../utils/music.data.ts';
import { randomInt } from '../utils/random';

// 定义音乐信息类型
interface TrackInfo {
  cover_url: string;
  artist_name: string;
  title: string;
  preview_track_url: string;
}

export function useMusicData() {
  // 音乐信息状态
  const track_info = ref<TrackInfo>({
    cover_url: '',
    artist_name: '',
    title: '',
    preview_track_url: '',
  });

  /**
   * 随机获取一首音乐信息
   */
  const getRandomTrack = () => {
    if (data && data.list && data.list.length > 0) {
      const randomIndex = randomInt(0, data.list.length);
      const randomTrack = data.list[randomIndex];
      
      track_info.value = {
        cover_url: randomTrack.artworkUrl100,
        artist_name: randomTrack.artistName,
        title: randomTrack.trackName,
        preview_track_url: randomTrack.previewUrl,
      };
      
      return track_info.value;
    }
    return null;
  };

  return {
    track_info,
    getRandomTrack,
  };
}
